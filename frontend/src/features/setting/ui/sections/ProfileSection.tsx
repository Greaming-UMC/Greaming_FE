import { useState, useRef, useEffect, useMemo } from "react";
import { BaseField, Button, SelectItem, TextAreaField } from "../../../../components/common";
import clsx from "clsx";
import Icon, { type IconName } from "../../../../components/common/Icon";

const ProfileSection = () => {
  const initialData = {
    nickname: "그림핑",
    bio: "저는 그림을 하는 척했습니다.",
    selectedJourney: 0,
    previewUrl: null as string | null,
    selectedCategories: ["#일러스트", "#캐릭터", "#풍경화", "#인물화"],
    selectedCategories2: ["#전통미술", "#동물", "#풍경화"],
    selectedStyles: ["#컬러"],
    selectedStyles2: ["#심플"],
    weeklyGoal: 80,
  };

  // --- 상태 관리 ---
  const [nickname, setNickname] = useState(initialData.nickname);
  const [nicknameStatus, setNicknameStatus] = useState<"unchecked" | "valid" | "invalid">("unchecked");
  const [isChecking, setIsChecking] = useState(false);

  const [bio, setBio] = useState(initialData.bio);
  const [selectedJourney, setSelectedJourney] = useState(initialData.selectedJourney);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.previewUrl);
  const [selectedCategories, setSelectedCategories] = useState(initialData.selectedCategories);
  const [selectedCategories2, setSelectedCategories2] = useState(initialData.selectedCategories2);
  const [selectedStyles, setSelectedStyles] = useState(initialData.selectedStyles);
  const [selectedStyles2, setSelectedStyles2] = useState(initialData.selectedStyles2);
  const [weeklyGoal, setWeeklyGoal] = useState(initialData.weeklyGoal);

  const [isChanged, setIsChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🎨 공통 스타일 상수
  const testCardStyle = "shadow-[0_0_4px_0_rgba(18,19,21,0.25)] border-none";
  const MAX_NICKNAME_LEN = 8;

  // --- 닉네임 로직 ---
  const handleNicknameChange = (v: string) => {
    if (v.length > MAX_NICKNAME_LEN) return;
    setNickname(v);
    setNicknameStatus("unchecked");
  };

  const handleCheckNickname = async () => {
    if (!nickname.trim() || isChecking) return;
    setIsChecking(true);
    try {
      const lower = nickname.trim().toLowerCase();
      const isValid = !(lower === "admin" || lower === "test");
      setNicknameStatus(isValid ? "valid" : "invalid");
    } finally {
      setIsChecking(false);
    }
  };

  const nicknameUI = useMemo(() => {
    if (nickname.trim().length === 0) return null;
    const configs = {
      unchecked: { icon: "warning", color: "text-error", text: "닉네임 중복확인을 해주세요." },
      invalid: { icon: "error", color: "text-error", text: "사용할 수 없는 닉네임입니다." },
      valid: { icon: "check_circle", color: "text-secondary-variant", text: "사용할 수 있는 닉네임입니다." },
    };
    return configs[nicknameStatus];
  }, [nickname, nicknameStatus]);

  // --- 변경 감지 ---
  useEffect(() => {
    const hasChanged =
      nickname !== initialData.nickname ||
      bio !== initialData.bio ||
      selectedJourney !== initialData.selectedJourney ||
      previewUrl !== initialData.previewUrl ||
      weeklyGoal !== initialData.weeklyGoal ||
      JSON.stringify(selectedCategories) !== JSON.stringify(initialData.selectedCategories) ||
      JSON.stringify(selectedStyles) !== JSON.stringify(initialData.selectedStyles) ||
      JSON.stringify(selectedCategories2) !== JSON.stringify(initialData.selectedCategories2) ||
      JSON.stringify(selectedStyles2) !== JSON.stringify(initialData.selectedStyles2);
    setIsChanged(hasChanged);
  }, [nickname, bio, selectedJourney, previewUrl, selectedCategories, selectedStyles, selectedCategories2, selectedStyles2, weeklyGoal]);

  const journeyList = [
    { title: "재미로 그림 그리기: Sketcher", desc: "순위 상관없이 자유롭게 그림그리고 싶어요... : 랭킹시스템이 없어요.", icon: "badge_sketcher" },
    { title: "꾸준한 습관: Painter", desc: "그림 초보자는 아니지만... : '출석점수'를 합산하여 랭킹이 나눠져요", icon: "badge_painter" },
    { title: "성장을 이어가는: Artist", desc: "그림 초보자는 아니지만... : '좋아요'를 합산하여 랭킹이 나눠져요", icon: "badge_artist" },
    { title: "전문적으로 활동하는: Master", desc: "전문적으로 그림을 그리는 사람... : '출석점수'와 '좋아요'를 합산하여 랭킹이 나눠져요", icon: "badge_master" },
  ];

  const categoryOptions = ["#일러스트", "#캐릭터", "#풍경화", "#인물화", "#일상", "#인사이드", "#추상화", "#판타지", "#애니메이션", "#수채화", "#건축물", "#연필", "#동물", "#전통미술", "#펜아트", "#꽃", "#음식", "#크로키"];
  const styleOptions = ["#컬러", "#흑백", "#귀여운", "#공포", "#디테일", "#심플"];

  return (
    <section className="flex flex-col gap-10 w-full">

      {/* 1. 헤더 */}
      <div className="flex justify-between items-center pb-2">
        <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
        <Button variant={isChanged ? "primary" : "surfaceVariant"} shape="round" widthMode="fixed" width="130px" disabled={!isChanged} onClick={() => setIsChanged(false)}>저장</Button>
      </div>

      {/* 2. 이미지 업로드 */}
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center overflow-hidden rounded-full bg-surface-variant-high" style={{ width: 112, height: 112 }}>
          {previewUrl ? <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" /> : <Icon name="avatar_grey" size={112} />}
        </div>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
          }
        }} />
        <Button variant="surface" shape="round" widthMode="fixed" width="168px" className="border py-2 label-medium" onClick={() => fileInputRef.current?.click()}>프로필 사진 업로드</Button>
      </div>

      {/* 3. 닉네임 (상태 메시지 포함) */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <label className="label-xlarge-emphasized text-on-surface">닉네임</label>
          {nicknameUI && (
            <div className="flex items-center gap-2">
              <Icon name={nicknameUI.icon as any} size={18} className={clsx("fill-current", nicknameUI.color)} />
              <span className={clsx("label-large-emphasized", nicknameUI.color)}>{nicknameUI.text}</span>
            </div>
          )}
        </div>
        <BaseField 
          headline="" 
          value={nickname} 
          onChange={handleNicknameChange} 
          widthMode="fill" 
          tone="surfaceVariantHigh" 
          placeholder="8자 이내로 입력하세요" 
          action={{ 
            label: isChecking ? "확인 중" : "중복확인", 
            onClick: handleCheckNickname,
            disabled: isChecking || !nickname.trim(),
            className: "!bg-surface-variant-lowest !text-white !w-[80px] !h-[32px] !rounded-full label-medium-emphasized"
          }} 
          className="label-large" 

        />
      </div>

      {/* 4. 소개글 */}
      <div className="flex flex-col gap-4">
        <label className="label-xlarge-emphasized text-on-surface px-1">소개글</label>

        <TextAreaField value={bio} onChange={setBio} widthMode="fill" height="154px" tone="surfaceVariantHigh" placeholder="자기소개를 입력해주세요." maxLength={350} showCounter={true} className="label-large" />
      </div>

      {/* 5. Journey 수정 */}
      <div className="flex flex-col gap-4">
        <h3 className="label-xlarge-emphasized text-on-surface">Journey 수정하기</h3>
        <div className="flex flex-col gap-2">
          {journeyList.map((item, idx) => (
            <SelectItem
              key={idx}
              title={item.title}
              subtitle={{variant: "text", value: item.desc}}
              leading={<Icon name={item.icon as IconName} size={44} />}
              onClick={() => setSelectedJourney(idx)}
              selected={selectedJourney === idx}
              selectionStyle="solid"
              size="lg"
              className={clsx("cursor-pointer !rounded-large transition-all", testCardStyle)}
            />
          ))}
        </div>
      </div>

      {/* 6. 주간 목표 */}
      <div className={clsx("flex flex-col gap-4 p-4 bg-surface rounded-large", testCardStyle)}>
        <h4 className="label-xlarge-emphasized text-on-surface">주간 목표 점수 설정</h4>
        <div className="flex justify-between p-2 bg-surface-variant-low rounded-full px-4 h-12 items-center">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((score) => {
            const isSelected = weeklyGoal === score;
            return (
            <Button key={score}
                    variant={isSelected ? "primary" : "surface"}
                    shape="round" 
                    onClick={() => setWeeklyGoal(score)} 
                    className={clsx(
                      "w-10 h-10 !p-0 flex items-center justify-center transition-all",
                      !isSelected && "text-on-surface-variant-low" 
                    )}
                  >
                {score}
            </Button>

            );
          })}
        </div>
      </div>


      {/* 7. 내 특기 선택 */}
      <div className="flex flex-col gap-8 mb-10">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 특기 선택</h3>

        {/* --- 분야 선택 섹션 --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <span className="label-large-emphasized text-on-surface">분야</span>
            <span className="text-[11px] text-on-surface-variant-lowest">
              최소 1개 최대 4개 ({selectedCategories.length}/4)
            </span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {categoryOptions.map((tag) => {
              const isSelected = selectedCategories.includes(tag);
              const isDisableMode = !isSelected && selectedCategories.length >= 4;
              return (
                <Button
                  key={tag}
                  variant={isSelected ? "primary" : "surface"}
                  shape="square"
                  size="sm"
                  widthMode="fixed"
                  width="110px"
                  disabled={isDisableMode}
                  onClick={() => {
                    if (isSelected) setSelectedCategories(selectedCategories.filter(t => t !== tag));
                    else if (selectedCategories.length < 4) setSelectedCategories([...selectedCategories, tag]);
                  }}
                  className={clsx(
                    "h-10 px-5 transition-all",
                    !isSelected && clsx("bg-surface text-on-surface", testCardStyle),
                  )}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>

        {/* --- 스타일 (무조건 1개만) --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <span className="label-large-emphasized text-on-surface">스타일</span>
            <span className="text-[11px] text-on-surface-variant-lowest">1개 선택</span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {styleOptions.map((tag) => {
              const isSelected = selectedStyles.includes(tag);
              return (
                <Button
                  key={tag}
                  variant={isSelected ? "primary" : "surface"}
                  shape="square" size="sm" widthMode="fixed" width="110px"
                  onClick={() => {
                    if (isSelected) setSelectedStyles([]);
                    else setSelectedStyles([tag]);
                  }}
                  className={clsx(
                    "h-10 px-5 transition-all",
                    !isSelected && clsx("bg-surface text-on-surface", testCardStyle)
                  )}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8. 내 관심분야 선택 */}
      <div className="flex flex-col gap-8">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 관심 해시태그 선택</h3>

        {/* --- 분야 선택 섹션 --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <span className="label-large-emphasized text-on-surface">분야</span>
            <span className="text-[11px] text-on-surface-variant-lowest">
              최소 1개 최대 4개 ({selectedCategories2.length}/4)
            </span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {categoryOptions.map((tag) => {
              const isSelected = selectedCategories2.includes(tag);
              const isDisableMode = !isSelected && selectedCategories2.length >= 4;
              return (
                <Button
                  key={tag}
                  variant={isSelected ? "primary" : "surface"}
                  shape="square"
                  size="sm"
                  widthMode="fixed"
                  width="110px"
                  disabled={isDisableMode}
                  onClick={() => {
                    if (isSelected) setSelectedCategories2(selectedCategories2.filter(t => t !== tag));
                    else if (selectedCategories2.length < 4) setSelectedCategories2([...selectedCategories2, tag]);
                  }}
                  className={clsx(
                    "h-10 px-5 transition-all",
                    !isSelected && clsx("bg-surface text-on-surface", testCardStyle)
                  )}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>

        {/* --- 스타일 선택 섹션 --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <span className="label-large-emphasized text-on-surface">스타일</span>
            <span className="text-[11px] text-on-surface-variant-lowest">
              1개 선택
            </span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {styleOptions.map((tag) => {
              const isSelected = selectedStyles2.includes(tag);
              return (
                <Button
                  key={tag}
                  variant={isSelected ? "primary" : "surface"}
                  shape="square"
                  size="sm"
                  widthMode="fixed"
                  width="110px"
                  onClick={() => {
                    if (isSelected) setSelectedStyles2([]);
                    else setSelectedStyles2([tag]);
                  }}
                  className={clsx(
                    "h-10 px-5 transition-all",
                    !isSelected && clsx("bg-surface text-on-surface", testCardStyle)
                  )}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProfileSection;