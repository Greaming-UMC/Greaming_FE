import { useState, useEffect } from "react";
import { useBlocker } from "react-router-dom"; 
import { Button, TextAreaField } from "../../../../components/common";
import { useProfileSetting } from "../hooks/useProfileSetting";

import type { UsagePurpose, ArtField, ArtStyle } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";

import { ProfileImageSection, NicknameSection, JourneySection, GoalSection, TagGroupSection } from "./components";
import { getPresignedUrl, putToS3 } from "../api/s3";

const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

const normalizeJourneyLevel = (value: unknown): UsagePurpose | undefined => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toUpperCase();
  if (
    normalized === "SKETCHER" ||
    normalized === "PAINTER" ||
    normalized === "ARTIST" ||
    normalized === "MASTER"
  ) {
    return normalized;
  }
  return undefined;
};

interface ProfileSectionProps {
  isChanged: boolean;
  setIsChanged: (val: boolean) => void;
}

const ProfileSection = ({ isChanged, setIsChanged }: ProfileSectionProps) => {
  const { profileData, updateProfile, validateNickname, isLoading, isUpdating } = useProfileSetting();

  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<"unchecked" | "valid" | "invalid" | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [weeklyGoal, setWeeklyGoal] = useState(5);

  const [specialtyFields, setSpecialtyFields] = useState<ArtField[]>([]);
  const [specialtyStyle, setSpecialtyStyle] = useState<ArtStyle | null>(null);
  const [interestFields, setInterestFields] = useState<ArtField[]>([]);
  const [interestStyle, setInterestStyle] = useState<ArtStyle | null>(null);

  const journeyList: { title: string; desc: string; icon: UsagePurpose }[] = [
    { title: "재미로 그림 그리기: Sketcher", desc: "순위 상관없이 자유롭게 그림그리고 싶어요...", icon: "SKETCHER" },
    { title: "꾸준한 습관: Painter", desc: "그림 초보자 추천...", icon: "PAINTER" },
    { title: "성장을 이어가는: Artist", desc: "그림 초보자는 아니지만...", icon: "ARTIST" },
    { title: "전문적으로 활동하는: Master", desc: "전문적으로 그림을 그리는 사람...", icon: "MASTER" },
  ];

  // 🟢 1. 외부 이탈 방지 (URL 변경 시)
  const blocker = useBlocker(({ currentLocation, nextLocation }) => 
    isChanged && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = window.confirm("수정 중인 내용이 저장되지 않을 수 있습니다. 이동하시겠습니까?");
      if (proceed) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  // 🟢 2. 브라우저 이탈 방지 (새로고침 등)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isChanged) {
        e.preventDefault();
        e.returnValue = ""; 
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isChanged]);

  // 데이터 초기 로드
  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || "");
      setBio(profileData.introduction || ""); 
      setPreviewUrl(profileData.profileImgUrl || null); 
      setWeeklyGoal(profileData.weeklyGoalScore ?? 5);
      
      const sTags = profileData.specialtyTags || [];
      setSpecialtyFields(sTags.filter((t: any) => t in ART_FIELD_LABEL) as ArtField[]);
      setSpecialtyStyle(sTags.find((t: any) => t in ART_STYLE_LABEL) as ArtStyle || null);

      const iTags = profileData.interestTags || [];
      setInterestFields(iTags.filter((t: any) => t in ART_FIELD_LABEL) as ArtField[]);
      setInterestStyle(iTags.find((t: any) => t in ART_STYLE_LABEL) as ArtStyle || null);

      const serverJourney = normalizeJourneyLevel(profileData.journeyLevel);
      if (serverJourney) {
        const foundIdx = journeyList.findIndex(j => j.icon.toUpperCase() === String(serverJourney).toUpperCase());
        if (foundIdx !== -1) setSelectedJourney(foundIdx);
      }
    }
  }, [profileData]);

  // 🟢 3. 변경 감지 로직 (부모의 setIsChanged 호출)
  useEffect(() => {
    if (!profileData) return;
    const serverJourney = normalizeJourneyLevel(profileData.journeyLevel);

    const isBasicDiff = 
      nickname !== (profileData.nickname || "") || 
      bio !== (profileData.introduction || "") || 
      journeyList[selectedJourney].icon !== (serverJourney || "SKETCHER") || 
      previewUrl !== profileData.profileImgUrl || 
      weeklyGoal !== (profileData.weeklyGoalScore ?? 5);

    const currentSpecs = [...specialtyFields, ...(specialtyStyle ? [specialtyStyle] : [])].sort();
    const serverSpecs = [...(profileData.specialtyTags || [])].sort();
    const isSpecialtyDiff = JSON.stringify(currentSpecs) !== JSON.stringify(serverSpecs);

    const currentInterests = [...interestFields, ...(interestStyle ? [interestStyle] : [])].sort();
    const serverInterests = [...(profileData.interestTags || [])].sort();
    const isInterestDiff = JSON.stringify(currentInterests) !== JSON.stringify(serverInterests);

    const isNicknameValid = nickname === (profileData.nickname || "") || nicknameStatus === "valid";
    
    setIsChanged((isBasicDiff || isSpecialtyDiff || isInterestDiff) && isNicknameValid);

  }, [nickname, bio, selectedJourney, previewUrl, weeklyGoal, nicknameStatus, profileData, specialtyFields, specialtyStyle, interestFields, interestStyle, setIsChanged]);

  const handleSave = async () => {
    if (!isChanged || isUpdating) return;
    
    let finalImgKey = ""; 
    const currentUrl = profileData?.profileImgUrl || "";

    try {
      if (imageFile) {
        const res = await getPresignedUrl({ prefix: "profile", fileName: imageFile.name });
        await putToS3(res.url, imageFile);
        finalImgKey = res.key;
      } else {
        if (currentUrl.includes("amazonaws.com/")) {
          finalImgKey = currentUrl.split("amazonaws.com/")[1];
        } else {
          finalImgKey = currentUrl; 
        }
      }

      const requestData = {
        nickname,
        intro: bio,               
        journeyLevel: journeyList[selectedJourney].icon, 
        profileImageKey: finalImgKey, 
        weeklyGoalScore: weeklyGoal,
        specialtyTags: [...specialtyFields, ...(specialtyStyle ? [specialtyStyle] : [])],
        interestTags: [...interestFields, ...(interestStyle ? [interestStyle] : [])],
      };

      updateProfile(requestData);
      setImageFile(null); 
      
    } catch (error) {
      console.error("저장 중 에러 발생:", error);
      alert("프로필 저장에 실패했습니다.");
    }
  };

  if (isLoading) return <div className="w-full py-20 text-center">데이터 로딩 중...</div>;
  if (!profileData) return <div className="w-full py-20 text-center text-error">정보를 불러올 수 없습니다.</div>;

  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex justify-between items-center pb-2">
        <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
        <Button variant={isChanged ? "primary" : "surfaceVariant"} shape="round" widthMode="fixed" width="8.875rem" disabled={!isChanged || isUpdating} onClick={handleSave}>
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </div>

      <ProfileImageSection 
        previewUrl={previewUrl} 
        onUpload={(url, file) => {
          setPreviewUrl(url); 
          if (file) setImageFile(file); 
        }} 
      />
      
      <NicknameSection 
        value={nickname} 
        status={nickname === profileData.nickname ? undefined : nicknameStatus} 
        isChecking={isChecking} 
        onChange={(v) => { setNickname(v); setNicknameStatus(v === profileData.nickname ? undefined : "unchecked"); }} 
        onCheck={async () => {
          setIsChecking(true);
          const isValid = await validateNickname(nickname);
          setNicknameStatus(isValid ? "valid" : "invalid");
          setIsChecking(false);
        }} 
      />

      <TextAreaField value={bio} onChange={setBio} headline="소개글" height="154px" maxLength={350} showCounter />
      <JourneySection list={journeyList} selectedIdx={selectedJourney} onSelect={setSelectedJourney} />
      <GoalSection goal={weeklyGoal} onSelect={setWeeklyGoal} />
      
      <div className="flex flex-col gap-8 mb-10">
        <h3 className="sub-title-large-emphasized text-on-surface"># 내 특기 선택</h3>
        <TagGroupSection title="분야" options={FIELD_KEYS} labelMap={ART_FIELD_LABEL} selected={specialtyFields} onChange={(val) => setSpecialtyFields(val as ArtField[])} />
        <TagGroupSection title="스타일" options={STYLE_KEYS} labelMap={ART_STYLE_LABEL} selected={specialtyStyle ? [specialtyStyle] : []} onChange={(val) => setSpecialtyStyle(val[0] as ArtStyle || null)} max={1} />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="sub-title-large-emphasized text-on-surface"># 내 관심 해시태그 선택</h3>
        <TagGroupSection title="분야" options={FIELD_KEYS} labelMap={ART_FIELD_LABEL} selected={interestFields} onChange={(val) => setInterestFields(val as ArtField[])} />
        <TagGroupSection title="스타일" options={STYLE_KEYS} labelMap={ART_STYLE_LABEL} selected={interestStyle ? [interestStyle] : []} onChange={(val) => setInterestStyle(val[0] as ArtStyle || null)} max={1} />
      </div>
    </section>
  );
};

export default ProfileSection;
