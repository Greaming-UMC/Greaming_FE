import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { ActionItem, BaseField, Button, TextAreaField } from "../../../../components/common";
import clsx from "clsx";
import Icon, { type IconName } from "../../../../components/common/Icon";

const ProfileSection = () => {
  // 1. 초기값 정의
  const initialData = {
    nickname: "그리밍마스터",
    bio: "",
    selectedJourney: 0,
    previewUrl: null as string | null,
    selectedCategories: ["#일러스트", "#캐릭터", "#풍경화", "#인물화"],
    selectedStyles: ["#컬러"],
    weeklyGoal: 80,
  };

  // 2. 상태 관리
  const [nickname, setNickname] = useState(initialData.nickname);
  const [bio, setBio] = useState(initialData.bio);
  const [selectedJourney, setSelectedJourney] = useState(initialData.selectedJourney);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.previewUrl);
  const [selectedCategories, setSelectedCategories] = useState(initialData.selectedCategories);
  const [selectedStyles, setSelectedStyles] = useState(initialData.selectedStyles);
  const [weeklyGoal, setWeeklyGoal] = useState(initialData.weeklyGoal);

  const [isChanged, setIsChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. 변경 감지 로직 (AccountSection 스타일)
  useEffect(() => {
    const hasChanged =
      nickname !== initialData.nickname ||
      bio !== initialData.bio ||
      selectedJourney !== initialData.selectedJourney ||
      previewUrl !== initialData.previewUrl ||
      weeklyGoal !== initialData.weeklyGoal ||
      JSON.stringify(selectedCategories) !== JSON.stringify(initialData.selectedCategories) ||
      JSON.stringify(selectedStyles) !== JSON.stringify(initialData.selectedStyles);

    setIsChanged(hasChanged);
  }, [nickname, bio, selectedJourney, previewUrl, selectedCategories, selectedStyles, weeklyGoal]);

  // 4. 핸들러
  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleTagToggle = (tag: string, list: string[], setFn: (val: string[]) => void) => {
    if (list.includes(tag)) {
      setFn(list.filter((t) => t !== tag));
    } else {
      if (list.length < 4) setFn([...list, tag]);
    }
  };

  const handleSave = () => {
    console.log("최종 설정 저장됨:", { nickname, bio, selectedJourney, previewUrl, selectedCategories, selectedStyles, weeklyGoal });
    setIsChanged(false);
    // 실제 구현 시에는 여기서 API 호출 후 초기값을 현재 값으로 갱신하는 로직이 필요할 수 있습니다.
  };

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
      {/* 1. 헤더 영역 */}
      <div className="flex justify-between items-center pb-2">
        <h2 className="main-title-small-emphasized text-on-surface">프로필 설정</h2>
        <Button 
          variant="primary" 
          shape="round" 
          width="80px" 
          disabled={!isChanged}
          onClick={handleSave}
        >
          저장
        </Button>
      </div>

      {/* 2. 프로필 이미지 업로드 */}
      <div className="flex items-center gap-6">
        <div 
          className="flex items-center justify-center overflow-hidden rounded-full bg-gray-100 border border-gray-200 shadow-md shadow-gray-200/50" 
          style={{ width: 112, height: 112 }}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Profile Preview" className="h-full w-full object-cover" />
          ) : (
            <Icon name="avatar_grey" size={112} />
          )}
        </div>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        <Button variant="surface" shape="round" widthMode="fixed" width="142px" className="border px-5 py-2 label-medium" onClick={handleUploadClick}>
          업로드
        </Button>
      </div>

      {/* 3. 닉네임 설정 */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <label className="label-xlarge-emphasized text-on-surface">닉네임</label>
          <span className="text-error text-xs">⚠️ 닉네임 중복확인을 해주세요.</span>
        </div>
        <BaseField
          value={nickname}
          onChange={setNickname}
          widthMode="fill"
          tone="surfaceVariantHigh"
          placeholder="닉네임을 입력하세요"
          action={{
            label: "중복확인",
            onClick: () => console.log("중복확인 클릭"),
            className: "bg-[#4A4A4A] text-white"
          }}
          className="label-large"
        />
      </div>

      {/* 4. 소개글 */}
      <div className="flex flex-col gap-4">
        <label className="label-xlarge-emphasized text-on-surface px-1">소개글</label>
        <TextAreaField
          value={bio}
          onChange={setBio}
          widthMode="fill"
          height="154px"
          tone="surfaceVariantHigh"
          placeholder="자기소개를 입력해주세요."
          maxLength={350}
          showCounter={true}
          className="label-large"
        />
      </div>

      {/* 5. Journey 수정하기 */}
      <div className="flex flex-col gap-4">
        <h3 className="label-xlarge-emphasized text-on-surface">Journey 수정하기</h3>
        <div className="flex flex-col gap-2">
          {journeyList.map((item, idx) => {
            const isActive = selectedJourney === idx;
            return (
              <ActionItem
                key={idx}
                title={item.title} 
                subtitle={item.desc}
                leading={<Icon name={item.icon as IconName} size={44} />}
                onClick={() => setSelectedJourney(idx)}
                action="none"
                size="lg"
                className={clsx(
                  "shadow-md shadow-gray-200/50 border transition-all cursor-pointer !rounded-[16px]",
                  isActive ? "!bg-primary" : "bg-white border-gray-200"
                )}
                titleClassName={isActive ? "text-secondary" : "text-on-surface"}
                subtitleClassName={isActive ? "text-white opacity-70" : "text-on-surface-variant"}
              />
            );
          })}
        </div>
      </div>

      {/* 6. 주간 목표 점수 설정 */}
      <div className="flex flex-col gap-4 p-4 shadow-md shadow-gray-200/50 border border-gray-200 rounded-[16px] bg-white">
        <h4 className="label-xlarge-emphasized text-on-surface">주간 목표 점수 설정</h4>
        <div className="flex justify-between p-2 bg-on-surface-variant-low rounded-full px-4 h-12 items-center">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((score) => (
            <Button
              key={score}
              variant="surface"
              shape="round"
              onClick={() => setWeeklyGoal(score)}
              className={clsx(
                "w-10 h-10 !p-0 flex items-center justify-center rounded-full transition-all",
                weeklyGoal === score ? "!bg-black !text-secondary" : "bg-surface !text-on-surface-variant-low"
              )}
            >
              {score}
            </Button>
          ))}
        </div>
      </div>

      {/* 7. 내 특기 선택 */}
      <div className="flex flex-col gap-8">
        <h3 className="label-xlarge-emphasized text-on-surface"># 내 특기 선택</h3>
        
        {/* 분야 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <span className="label-large-emphasized text-on-surface">분야</span>
            <span className="text-[11px] text-gray-400">최소 1개 최대 4개 ({selectedCategories.length}/4)</span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {categoryOptions.map((tag) => (
              <Button
                key={tag}
                variant={selectedCategories.includes(tag) ? "primary" : "surface"}
                shape="square" size="sm" widthMode="fixed" width="115px"
                onClick={() => handleTagToggle(tag, selectedCategories, setSelectedCategories)}
                className={clsx(
                  "h-10 px-5 transition-all shadow-md shadow-gray-200/50 border",
                  selectedCategories.includes(tag) ? "!bg-primary !text-secondary !border-primary" : "bg-white text-on-surface border-gray-200"
                )}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* 스타일 */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <span className="label-large-emphasized text-on-surface">스타일</span>
            <span className="text-[11px] text-gray-400">최소 1개 최대 4개 ({selectedStyles.length}/4)</span>
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {styleOptions.map((tag) => (
              <Button
                key={tag}
                variant={selectedStyles.includes(tag) ? "primary" : "surface"}
                shape="square" size="sm" widthMode="fixed" width="115px"
                onClick={() => handleTagToggle(tag, selectedStyles, setSelectedStyles)}
                className={clsx(
                  "h-10 px-5 transition-all shadow-md shadow-gray-200/50 border",
                  selectedStyles.includes(tag) ? "!bg-primary !text-secondary !border-primary" : "bg-white text-on-surface border-gray-200"
                )}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;