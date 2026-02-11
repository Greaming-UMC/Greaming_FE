import { useState, useEffect } from "react";
import { Button, TextAreaField } from "../../../../components/common";
import { useProfileSetting } from "../hooks/useProfileSetting";

import type { UsagePurpose, ArtField, ArtStyle, UserInformations } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";

import { ProfileImageSection, NicknameSection, JourneySection, GoalSection, TagGroupSection } from "./components";

const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

const ProfileSection = () => {
  const myId = localStorage.getItem("userId") || ""; 
  const { profileData, updateProfile, validateNickname, isLoading, isUpdating } = useProfileSetting(myId);

  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<"unchecked" | "valid" | "invalid" | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [specialtyFields, setSpecialtyFields] = useState<ArtField[]>([]);
  const [specialtyStyle, setSpecialtyStyle] = useState<ArtStyle | null>(null);
  const [interestFields, setInterestFields] = useState<ArtField[]>([]);
  const [interestStyle, setInterestStyle] = useState<ArtStyle | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  const journeyList: { title: string; desc: string; icon: UsagePurpose }[] = [
    { title: "Sketcher", desc: "순위 상관없이 자유롭게 그림그리기", icon: "SKETCHER" },
    { title: "Painter", desc: "출석 점수 기반 랭킹", icon: "PAINTER" },
    { title: "Artist", desc: "좋아요 합산 랭킹", icon: "ARTIST" },
    { title: "Master", desc: "출석과 좋아요 모두 합산", icon: "MASTER" },
  ];

  // 🟢 데이터 초기화
  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || "");
      setBio(profileData.intro || "");
      setPreviewUrl(profileData.profileImgUrl || null);
      setWeeklyGoal(profileData.weeklyGoalScore || 0);
      
      const specs = profileData.specialties || { fields: [], style: "" };
      const ints = profileData.interests || { fields: [], style: "" };

      setSpecialtyFields(specs.fields || []);
      setSpecialtyStyle(specs.style as ArtStyle || null);
      setInterestFields(ints.fields || []);
      setInterestStyle(ints.style as ArtStyle || null);

      const levelIdx = journeyList.findIndex(j => j.icon === profileData.usagePurpose);
      if (levelIdx !== -1) setSelectedJourney(levelIdx);
    }
  }, [profileData]);

  // 🟢 변경 감지
  useEffect(() => {
    if (!profileData) return;
    const isBasicDiff = nickname !== (profileData.nickname || "") || bio !== (profileData.intro || "") || journeyList[selectedJourney].icon !== profileData.usagePurpose || previewUrl !== profileData.profileImgUrl || weeklyGoal !== (profileData.weeklyGoalScore || 0);
    const isSpecialtyDiff = JSON.stringify([...specialtyFields].sort()) !== JSON.stringify([...(profileData.specialties?.fields || [])].sort()) || specialtyStyle !== (profileData.specialties?.style || null);
    const isInterestDiff = JSON.stringify([...interestFields].sort()) !== JSON.stringify([...(profileData.interests?.fields || [])].sort()) || interestStyle !== (profileData.interests?.style || null);
    const isNicknameValid = nickname === profileData.nickname || nicknameStatus === "valid";

    setIsChanged((isBasicDiff || isSpecialtyDiff || isInterestDiff) && isNicknameValid);
  }, [nickname, bio, selectedJourney, previewUrl, weeklyGoal, nicknameStatus, profileData, specialtyFields, specialtyStyle, interestFields, interestStyle]);

  const handleSave = () => {
  if (!isChanged || isUpdating) return;
  

  const requestData: Partial<UserInformations> = {
    nickname,
    intro: bio,
    usagePurpose: journeyList[selectedJourney].icon,
    profileImgUrl: previewUrl || "",
    weeklyGoalScore: weeklyGoal,
    specialties: { 
      fields: specialtyFields, 
      style: specialtyStyle || "" 
    },
    interests: { 
      fields: interestFields, 
      style: interestStyle || "" 
    },
  };

  updateProfile(requestData);
};

  if (isLoading) return <div className="w-full py-20 text-center text-on-surface-variant">데이터 로딩 중...</div>;
  if (!profileData) return <div className="w-full py-20 text-center text-error">정보를 불러올 수 없습니다.</div>;

  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex justify-between items-center pb-2">
        <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
        <Button variant={isChanged ? "primary" : "surfaceVariant"} shape="round" widthMode="fixed" width="8.875rem" disabled={!isChanged || isUpdating} onClick={handleSave}>
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </div>

      <ProfileImageSection previewUrl={previewUrl} onUpload={setPreviewUrl} />
      
      <NicknameSection 
        value={nickname} 
        status={nickname === profileData?.nickname ? undefined : nicknameStatus} 
        isChecking={isChecking} 
        onChange={(v) => { setNickname(v); setNicknameStatus(v === profileData?.nickname ? undefined : "unchecked"); }} 
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
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 특기 선택</h3>
        <TagGroupSection title="분야" options={FIELD_KEYS} labelMap={ART_FIELD_LABEL} selected={specialtyFields} onChange={setSpecialtyFields as any} />
        <TagGroupSection title="스타일" options={STYLE_KEYS} labelMap={ART_STYLE_LABEL} selected={specialtyStyle ? [specialtyStyle] : []} onChange={(val) => setSpecialtyStyle(val[0] as ArtStyle || null)} max={1} />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 관심 해시태그 선택</h3>
        <TagGroupSection title="분야" options={FIELD_KEYS} labelMap={ART_FIELD_LABEL} selected={interestFields} onChange={setInterestFields as any} />
        <TagGroupSection title="스타일" options={STYLE_KEYS} labelMap={ART_STYLE_LABEL} selected={interestStyle ? [interestStyle] : []} onChange={(val) => setInterestStyle(val[0] as ArtStyle || null)} max={1} />
      </div>
    </section>
  );
};

export default ProfileSection;