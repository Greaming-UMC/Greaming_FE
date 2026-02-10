import { useState, useEffect } from "react";
import { Button, TextAreaField } from "../../../../components/common";
import { useProfileSetting } from "../hooks/useProfileSetting";
import type { UsagePurpose, ArtField } from "../../../../apis/types/common";

// 분리된 자식 컴포넌트들
import { ProfileImageSection } from "./components/ProfileImageSection";
import { NicknameSection } from "./components/NicknameSection";
import { JourneySection } from "./components/JourneySection";
import { GoalSection } from "./components/GoalSection";
import { TagGroupSection } from "./components/TagGroupSection";

const IS_MOCK_MODE = false;

const MOCK_PROFILE_DATA = {
  nickname: "그림쟁이이야",
  intro: "안녕하세요! 디지털 드로잉을 즐기는 그림쟁이입니다.",
  profileImgUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop",
  usagePurpose: "PAINTER" as UsagePurpose,
  weeklyGoalScore: 50, 
  specialties: {
    fields: ["ILLUSTRATION", "CHARACTER"] as ArtField[],
    style: "DIGITAL"
  },
  interests: {
    fields: ["LANDSCAPE", "WATERCOLOR"] as ArtField[],
    style: "COLOR"
  },
};

const CATEGORY_MAP: Record<string, ArtField> = {
  "#일러스트": "ILLUSTRATION", "#캐릭터": "CHARACTER", "#풍경화": "LANDSCAPE", "#인물화": "PORTRAIT",
  "#일상": "DAILY", "#인사이드": "INSTATOON", "#추상화": "ABSTRACT", "#판타지": "FANTASY",
  "#애니메이션": "ANIMATION", "#수채화": "WATERCOLOR", "#건축물": "ARCHITECTURE", "#연필": "PENCIL",
  "#동물": "ANIMAL", "#전통미술": "TRADITIONAL", "#펜아트": "FAN_ART", "#꽃": "FLOWER",
  "#음식": "FOOD", "#크로키": "CROQUIS"
};

const STYLE_MAP: Record<string, string> = {
  "#컬러": "COLOR", "#흑백": "BLACK_AND_WHITE", "#귀여운": "CUTE",
  "#공포": "HORROR", "#디테일": "DETAILED", "#심플": "SIMPLE",
  "#디지털": "DIGITAL"
};

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries({ ...CATEGORY_MAP, ...STYLE_MAP }).map(([k, v]) => [v, k])
);

const ProfileSection = () => {
  const { profileData: realData, updateProfile, validateNickname, isLoading: apiLoading, isUpdating } = useProfileSetting();

  const profileData = IS_MOCK_MODE ? MOCK_PROFILE_DATA : realData;
  const isLoading = IS_MOCK_MODE ? false : apiLoading;

  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<"unchecked" | "valid" | "invalid" | undefined>(undefined);
  const [isChecking, setIsChecking] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories2, setSelectedCategories2] = useState<string[]>([]);
  const [selectedStyles2, setSelectedStyles2] = useState<string[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [isChanged, setIsChanged] = useState(false);

  const journeyList: { title: string; desc: string; icon: UsagePurpose }[] = [
    { title: "재미로 그림 그리기: Sketcher", desc: "순위 상관없이 자유롭게 그림그리고 싶어요... : 랭킹시스템이 없어요.", icon: "SKETCHER" },
    { title: "꾸준한 습관: Painter", desc: "그림 초보자 추천... : ‘출석점수’를 합산하여 랭킹이 나눠져요", icon: "PAINTER" },
    { title: "성장을 이어가는: Artist", desc: "그림 초보자는 아니지만... : ‘좋아요’를 합산하여 랭킹이 나눠져요", icon: "ARTIST" },
    { title: "전문적으로 활동하는: Master", desc: "전문적으로 그림을 그리는 사람... : ‘출석점수’와 ‘좋아요’를 합산하여 랭킹이 나눠져요", icon: "MASTER" },
  ];

  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || "");
      setNicknameStatus(undefined);
      setBio(profileData.intro || "");
      setPreviewUrl(profileData.profileImgUrl || null);
      setWeeklyGoal(profileData.weeklyGoalScore || 5);
      
      if (profileData.specialties) {
        setSelectedCategories(profileData.specialties.fields.map(f => REVERSE_MAP[f] || f));
        setSelectedStyles(profileData.specialties.style ? [REVERSE_MAP[profileData.specialties.style] || profileData.specialties.style] : []);
      }
      
      if (profileData.interests) {
        setSelectedCategories2(profileData.interests.fields.map(f => REVERSE_MAP[f] || f));
        setSelectedStyles2(profileData.interests.style ? [REVERSE_MAP[profileData.interests.style] || profileData.interests.style] : []);
      }

      const levelIdx = journeyList.findIndex(j => j.icon === profileData.usagePurpose);
      if (levelIdx !== -1) setSelectedJourney(levelIdx);
    }
  }, [profileData]);

  // 정밀 변경 감지 로직
  useEffect(() => {
    if (!profileData) return;

    // 1. 기본 정보 비교
    const isBasicDiff = 
      nickname !== (profileData.nickname || "") || 
      bio !== (profileData.intro || "") || 
      journeyList[selectedJourney].icon !== profileData.usagePurpose || 
      previewUrl !== profileData.profileImgUrl ||
      weeklyGoal !== (profileData.weeklyGoalScore || 5);

    // 2. 내 특기(specialties) 비교
    const currentSpecs = {
      fields: selectedCategories.map(t => CATEGORY_MAP[t] || t).sort(),
      style: selectedStyles[0] ? (STYLE_MAP[selectedStyles[0]] || selectedStyles[0]) : ""
    };
    const serverSpecs = {
      fields: [...(profileData.specialties?.fields || [])].sort(),
      style: profileData.specialties?.style || ""
    };
    const isSpecialtyDiff = JSON.stringify(currentSpecs) !== JSON.stringify(serverSpecs);

    // 3. 관심 해시태그(interests) 비교
    const currentInterests = {
      fields: selectedCategories2.map(t => CATEGORY_MAP[t] || t).sort(),
      style: selectedStyles2[0] ? (STYLE_MAP[selectedStyles2[0]] || selectedStyles2[0]) : ""
    };
    const serverInterests = {
      fields: [...(profileData.interests?.fields || [])].sort(),
      style: profileData.interests?.style || ""
    };
    const isInterestDiff = JSON.stringify(currentInterests) !== JSON.stringify(serverInterests);

    // 4. 닉네임 유효성 검사 (중복확인 필수 조건)
    // 💡 원래 닉네임과 같다면 Pass, 아니라면 반드시 중복확인 성공(valid) 상태여야 함
    const isNicknameValid = 
      nickname === (profileData.nickname || "") || 
      nicknameStatus === "valid";

    // 데이터가 하나라도 바뀌었는지 여부
    const hasAnyChange = isBasicDiff || isSpecialtyDiff || isInterestDiff;

    // 변경사항이 있고 + 닉네임이 (원래거거나 중복확인 완료된) 유효한 상태일 때만 버튼 활성화
    setIsChanged(hasAnyChange && isNicknameValid);

  }, [
    nickname, bio, selectedJourney, previewUrl, weeklyGoal, nicknameStatus, profileData, 
    selectedCategories, selectedStyles, selectedCategories2, selectedStyles2
  ]);

  const handleNicknameCheck = async () => {
    if (!nickname || nickname === profileData?.nickname) return;
    setIsChecking(true);
    try {
      const isValid = IS_MOCK_MODE ? true : await validateNickname(nickname);
      setNicknameStatus(isValid ? "valid" : "invalid");
    } catch (error) {
      setNicknameStatus("invalid");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSave = () => {
    if (!isChanged || isUpdating) return;
    const requestData = {
      nickname,
      intro: bio,
      usagePurpose: journeyList[selectedJourney].icon,
      profileImgUrl: previewUrl || "",
      weeklyGoalScore: weeklyGoal,
      specialties: {
        fields: selectedCategories.map(t => CATEGORY_MAP[t]),
        style: selectedStyles[0] ? (STYLE_MAP[selectedStyles[0]] || selectedStyles[0].replace('#', '')) : ""
      },
      interests: {
        fields: selectedCategories2.map(t => CATEGORY_MAP[t]),
        style: selectedStyles2[0] ? (STYLE_MAP[selectedStyles2[0]] || selectedStyles2[0].replace('#', '')) : ""
      },
    };

    if (IS_MOCK_MODE) {
      console.log("🚩 [MOCK MODE] 전송 데이터:", requestData);
      alert("목업 모드 저장 완료!");
      setIsChanged(false);
      return;
    }
    updateProfile(requestData as any);
  };

  if (isLoading) return <div className="w-full py-20 text-center text-on-surface-variant">데이터 로딩 중...</div>;

  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex justify-between items-center pb-2">
        <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
        <Button 
          variant={isChanged ? "primary" : "surfaceVariant"} 
          shape="round" 
          widthMode="fixed" 
          width="8.875rem" 
          disabled={!isChanged || isUpdating} 
          onClick={handleSave}
        >
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </div>

      <ProfileImageSection previewUrl={previewUrl} onUpload={setPreviewUrl} />
      <NicknameSection 
        value={nickname} 
        status={nickname === profileData?.nickname ? undefined : nicknameStatus} 
        isChecking={isChecking} 
        onChange={(v) => { 
          setNickname(v); 
          setNicknameStatus(v === profileData?.nickname ? undefined : "unchecked"); 
        }} 
        onCheck={handleNicknameCheck} 
      />

      <TextAreaField value={bio} onChange={setBio} headline="소개글" height="154px" maxLength={350} showCounter />
      <JourneySection list={journeyList} selectedIdx={selectedJourney} onSelect={setSelectedJourney} />
      <GoalSection goal={weeklyGoal} onSelect={setWeeklyGoal} />
      
      <div className="flex flex-col gap-8 mb-10">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 특기 선택</h3>
        <TagGroupSection title="분야" options={Object.keys(CATEGORY_MAP)} selected={selectedCategories} onChange={setSelectedCategories} />
        <TagGroupSection title="스타일" options={Object.keys(STYLE_MAP)} selected={selectedStyles} onChange={setSelectedStyles} max={1} />
      </div>

      <div className="flex flex-col gap-8">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 관심 해시태그 선택</h3>
        <TagGroupSection title="분야" options={Object.keys(CATEGORY_MAP)} selected={selectedCategories2} onChange={setSelectedCategories2} />
        <TagGroupSection title="스타일" options={Object.keys(STYLE_MAP)} selected={selectedStyles2} onChange={setSelectedStyles2} max={1} />
      </div>
    </section>
  );
};

export default ProfileSection;