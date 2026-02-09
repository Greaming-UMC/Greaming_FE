import { useState, useEffect } from "react";
import { Button, TextAreaField } from "../../../../components/common";
import { useProfileSetting } from "../hooks/useProfileSetting";
import type { UsagePurpose, ArtField, ArtStyle } from "../../../../apis/types/common"; // 👈 타입 임포트

// 분리된 자식 컴포넌트들
import { ProfileImageSection } from "./components/ProfileImageSection";
import { NicknameSection } from "./components/NicknameSection";
import { JourneySection } from "./components/JourneySection";
import { GoalSection } from "./components/GoalSection";
import { TagGroupSection } from "./components/TagGroupSection";

// 🎨 매핑 사전 (UI 한글 ↔ 서버 영문 코드)
const CATEGORY_MAP: Record<string, ArtField> = {
  "#일러스트": "ILLUSTRATION", "#캐릭터": "CHARACTER", "#풍경화": "LANDSCAPE", "#인물화": "PORTRAIT",
  "#일상": "DAILY", "#인사이드": "INSTATOON", "#추상화": "ABSTRACT", "#판타지": "FANTASY",
  "#애니메이션": "ANIMATION", "#수채화": "WATERCOLOR", "#건축물": "ARCHITECTURE", "#연필": "PENCIL",
  "#동물": "ANIMAL", "#전통미술": "TRADITIONAL", "#펜아트": "FAN_ART", "#꽃": "FLOWER",
  "#음식": "FOOD", "#크로키": "CROQUIS"
};

const STYLE_MAP: Record<string, ArtStyle> = {
  "#컬러": "COLOR", "#흑백": "BLACK_AND_WHITE", "#귀여운": "CUTE",
  "#공포": "HORROR", "#디테일": "DETAILED", "#심플": "SIMPLE"
};

// 반대 매핑 (서버 -> UI)
const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries({ ...CATEGORY_MAP, ...STYLE_MAP }).map(([k, v]) => [v, k])
);

const ProfileSection = () => {
  const { profileData, updateProfile, validateNickname, isLoading, isUpdating } = useProfileSetting();

  // --- 상태 관리 ---
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState<"unchecked" | "valid" | "invalid">("unchecked");
  const [isChecking, setIsChecking] = useState(false);
  const [bio, setBio] = useState("");
  const [selectedJourney, setSelectedJourney] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories2, setSelectedCategories2] = useState<string[]>([]);
  const [selectedStyles2, setSelectedStyles2] = useState<string[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState(80);
  const [isChanged, setIsChanged] = useState(false);

  const journeyList: { title: string; desc: string; icon: UsagePurpose }[] = [
    { title: "재미로 그림 그리기: Sketcher", desc: "순위 상관없이 자유롭게...", icon: "SKETCHER" },
    { title: "꾸준한 습관: Painter", desc: "출석점수 합산...", icon: "PAINTER" },
    { title: "성장을 이어가는: Artist", desc: "좋아요 합산...", icon: "ARTIST" },
    { title: "전문적으로 활동하는: Master", desc: "출석 + 좋아요 합산...", icon: "MASTER" },
  ];

  // 1. 초기 데이터 세팅
  useEffect(() => {
    if (profileData) {
      setNickname(profileData.nickname || "");
      setBio(profileData.introduction || "");
      setPreviewUrl(profileData.profileImgUrl || null);
      
      const sTags = profileData.specialtyTags || [];
      setSelectedCategories(sTags.filter(t => t in REVERSE_MAP && t in CATEGORY_MAP).map(t => REVERSE_MAP[t]));
      setSelectedStyles(sTags.filter(t => t in REVERSE_MAP && t in STYLE_MAP).map(t => REVERSE_MAP[t]));
      
      const iTags = profileData.interestTags || [];
      setSelectedCategories2(iTags.filter(t => t in REVERSE_MAP && t in CATEGORY_MAP).map(t => REVERSE_MAP[t]));
      setSelectedStyles2(iTags.filter(t => t in REVERSE_MAP && t in STYLE_MAP).map(t => REVERSE_MAP[t]));

      const levelIdx = journeyList.findIndex(j => j.icon === profileData.level);
      if (levelIdx !== -1) setSelectedJourney(levelIdx);
    }
  }, [profileData]);

  // 2. 변경 감지 로직
  useEffect(() => {
    if (!profileData) return;

    const isBasicDiff = nickname !== profileData.nickname || bio !== profileData.introduction || 
                        journeyList[selectedJourney].icon !== profileData.level || previewUrl !== profileData.profileImgUrl;

    const currentSTags = [...selectedCategories.map(t => CATEGORY_MAP[t]), ...selectedStyles.map(t => STYLE_MAP[t])].sort();
    const serverSTags = [...(profileData.specialtyTags || [])].sort();
    const isTagDiff = JSON.stringify(currentSTags) !== JSON.stringify(serverSTags);

    const isNicknameValid = nickname === profileData.nickname || nicknameStatus === "valid";
    setIsChanged((isBasicDiff || isTagDiff) && isNicknameValid);
  }, [nickname, bio, selectedJourney, previewUrl, nicknameStatus, profileData, selectedCategories, selectedStyles]);

  // 3. 저장 실행
  const handleSave = () => {
    if (!isChanged || isUpdating) return;
    updateProfile({
      nickname,
      introduction: bio,
      level: journeyList[selectedJourney].icon,
      profileImgUrl: previewUrl || "",
      specialtyTags: [...selectedCategories.map(t => CATEGORY_MAP[t]), ...selectedStyles.map(t => STYLE_MAP[t])],
      interestTags: [...selectedCategories2.map(t => CATEGORY_MAP[t]), ...selectedStyles2.map(t => STYLE_MAP[t])],
      followerCount: profileData?.followerCount || 0,
      followingCount: profileData?.followingCount || 0,
    });
  };

  if (isLoading) return <div className="w-full py-20 text-center">데이터 로딩 중...</div>;

  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="flex justify-between items-center pb-2">
        <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
        <Button variant={isChanged ? "primary" : "surfaceVariant"} disabled={!isChanged || isUpdating} onClick={handleSave}>
          {isUpdating ? "저장 중..." : "저장"}
        </Button>
      </div>

      <ProfileImageSection previewUrl={previewUrl} onUpload={setPreviewUrl} />
      <NicknameSection value={nickname} status={nicknameStatus} isChecking={isChecking} 
                       onChange={(v) => { setNickname(v); setNicknameStatus("unchecked"); }} 
                       onCheck={async () => {
                         setIsChecking(true);
                         const isValid = await validateNickname(nickname);
                         setNicknameStatus(isValid ? "valid" : "invalid");
                         setIsChecking(false);
                       }} />
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