import { BaseField, Checkbox } from "../../../../components/common";
import type { CircleFormSectionProps } from "../../types"; 

const CircleFormSection = ({
  circleName,
  setCircleName,
  circleDescription,
  setCircleDescription,
  isPublic,
  setIsPublic,
}: CircleFormSectionProps) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* 1. 써클 이름 */}
      <BaseField
        headline="써클 이름"
        value={circleName}
        onChange={setCircleName}
        placeholder="써클 이름"
        widthMode="fill"
      />

      {/* 2. 써클 인원수 */}
      <div className="flex flex-col gap-[8px]">
        <div className="sub-title-large-emphasized text-on-surface">써클 인원수</div>
        <div className="h-[60px] bg-surface-variant-high rounded-medium px-[24px] flex items-center justify-between cursor-pointer">
          <span className="text-on-surface-variant-lowest">직접입력</span>
          <span className="text-[12px] opacity-60">▼</span>
        </div>
      </div>

      {/* 3. 써클 소개 */}
      <BaseField
        headline="써클 소개"
        value={circleDescription}
        onChange={setCircleDescription}
        placeholder="띄어쓰기 포함 300자 이내 작성해주세요."
        widthMode="fill"
        showCounter={true}
        maxLength={300}
        heightMode="fill"
        // 줄바꿈이 안 되는 한계를 className으로 최대한 보정
        className="h-[250px] !items-start py-5" 
      />

      {/* 4. 공개 범위 선택 */}
      <div className="flex gap-2">
        <Checkbox 
          checked={isPublic} 
          onChange={() => setIsPublic(true)}
        >
          공개
        </Checkbox>
        <Checkbox 
          checked={!isPublic} 
          onChange={() => setIsPublic(false)}
        >
          비공개
        </Checkbox>
      </div>
    </div>
  );
};

export default CircleFormSection;