import { useState, useEffect } from "react";
import { Button, TextAreaField } from "../../../../components/common";
import { useProfileSetting } from "../hooks/useProfileSetting";

import type { UsagePurpose, ArtField, ArtStyle, UserInformations } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";

import { ProfileImageSection, NicknameSection, JourneySection, GoalSection, TagGroupSection } from "./components";

// 🟢 common.ts의 라벨 정보를 기반으로 키 배열 생성
const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

const ProfileSection = () => {
  const { profileData, updateProfile, validateNickname, isLoading, isUpdating } = useProfileSetting();

  // --- 상태 관리 ---
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<"unchecked" | "valid" | "invalid" | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [weeklyGoal, setWeeklyGoal] = useState(5);

  // 🟢 한글 라벨이 아닌 '영문 키(ID)'로 상태를 관리해야 서버와 통신이 편합니다.
  const [specialtyFields, setSpecialtyFields] = useState<ArtField[]>([]);
  const [specialtyStyle, setSpecialtyStyle] = useState<ArtStyle | null>(null);
  const [interestFields, setInterestFields] = useState<ArtField[]>([]);
  const [interestStyle, setInterestStyle] = useState<ArtStyle | null>(null);
  
  const [isChanged, setIsChanged] = useState(false);

  const journeyList: { title: string; desc: string; icon: UsagePurpose }[] = [
    { title: "재미로 그림 그리기: Sketcher", desc: "순위 상관없이 자유롭게 그림그리고 싶어요... : 랭킹시스템이 없어요.", icon: "SKETCHER" },
    { title: "꾸준한 습관: Painter", desc: "그림 초보자 추천... : ‘출석점수’를 합산하여 랭킹이 나눠져요", icon: "PAINTER" },
    { title: "성장을 이어가는: Artist", desc: "그림 초보자는 아니지만... : ‘좋아요’를 합산하여 랭킹이 나눠져요", icon: "ARTIST" },
    { title: "전문적으로 활동하는: Master", desc: "전문적으로 그림을 그리는 사람... : ‘출석점수’와 ‘좋아요’를 합산하여 랭킹이 나눠져요", icon: "MASTER" },
  ];

  // 1. 초기 데이터 로드 (서버 영문 키 -> 로컬 상태)
  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || "");
      setBio(profileData.introduction || ""); 
      setPreviewUrl(profileData.profileImgUrl || null);
      setWeeklyGoal(profileData.weeklyGoalScore ?? 5);
      
      const sTags = profileData.specialtyTags || [];
      // 🟢 서버에서 온 태그 중 Field에 속하는 것과 Style에 속하는 것을 필터링
      setSpecialtyFields(sTags.filter(t => t in ART_FIELD_LABEL) as ArtField[]);
      setSpecialtyStyle(sTags.find(t => t in ART_STYLE_LABEL) as ArtStyle || null);

      const iTags = profileData.interestTags || [];
      setInterestFields(iTags.filter(t => t in ART_FIELD_LABEL) as ArtField[]);
      setInterestStyle(iTags.find(t => t in ART_STYLE_LABEL) as ArtStyle || null);

      const levelIdx = journeyList.findIndex(j => j.icon === profileData.level);
      if (levelIdx !== -1) setSelectedJourney(levelIdx);
    }
  }, [profileData]);

  // 2. 변경 감지
  useEffect(() => {
    if (!profileData) return;

    const isBasicDiff = 
      nickname !== (profileData.nickname || "") || 
      bio !== (profileData.introduction || "") || 
      journeyList[selectedJourney].icon !== profileData.level || 
      previewUrl !== profileData.profileImgUrl ||
      weeklyGoal !== (profileData.weeklyGoalScore ?? 5);

    const currentSpecs = [...specialtyFields, ...(specialtyStyle ? [specialtyStyle] : [])].sort();
    const serverSpecs = [...(profileData.specialtyTags || [])].sort();
    const isSpecialtyDiff = JSON.stringify(currentSpecs) !== JSON.stringify(serverSpecs);

    const currentInterests = [...interestFields, ...(interestStyle ? [interestStyle] : [])].sort();
    const serverInterests = [...(profileData.interestTags || [])].sort();
    const isInterestDiff = JSON.stringify(currentInterests) !== JSON.stringify(serverInterests);

    const isNicknameValid = nickname === profileData.nickname || nicknameStatus === "valid";
    setIsChanged((isBasicDiff || isSpecialtyDiff || isInterestDiff) && isNicknameValid);
  }, [nickname, bio, selectedJourney, previewUrl, weeklyGoal, nicknameStatus, profileData, specialtyFields, specialtyStyle, interestFields, interestStyle]);

  const handleSave = () => {
    if (!isChanged || isUpdating) return;
    
    const requestData: Partial<UserInformations> = {
      nickname,
      introduction: bio,
      level: journeyList[selectedJourney].icon,
      profileImgUrl: previewUrl || "",
      weeklyGoalScore: weeklyGoal,
      specialtyTags: [...specialtyFields, ...(specialtyStyle ? [specialtyStyle] : [])],
      interestTags: [...interestFields, ...(interestStyle ? [interestStyle] : [])],
    };

    updateProfile(requestData as any);
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
        {/* 🟢 TagGroupSection이 ART_FIELD_LABEL을 참조하여 내부에서 #을 붙여줄 것입니다. */}
        <TagGroupSection title="분야" options={FIELD_KEYS} labelMap={ART_FIELD_LABEL} selected={specialtyFields} onChange={(val) => setSpecialtyFields(val as ArtField[])} />
        <TagGroupSection title="스타일" options={STYLE_KEYS} labelMap={ART_STYLE_LABEL} selected={specialtyStyle ? [specialtyStyle] : []} onChange={(val) => setSpecialtyStyle(val[0] as ArtStyle || null)} max={1} />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 관심 해시태그 선택</h3>
        <TagGroupSection title="분야" options={FIELD_KEYS} labelMap={ART_FIELD_LABEL} selected={interestFields} onChange={(val) => setInterestFields(val as ArtField[])} />
        <TagGroupSection title="스타일" options={STYLE_KEYS} labelMap={ART_STYLE_LABEL} selected={interestStyle ? [interestStyle] : []} onChange={(val) => setInterestStyle(val[0] as ArtStyle || null)} max={1} />
      </div>
    </section>
  );
};

export default ProfileSection;