import { useState } from 'react';
import { BaseField, Checkbox, TextAreaField } from "../../../../components/common";
import clsx from "clsx";
import Icon from '../../../../components/common/Icon';


export interface CircleFormSectionProps {
  circleName: string;
  setCircleName: (val: string) => void;
  circleDescription: string;
  setCircleDescription: (val: string) => void;
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
  memberOption: string;
  setMemberOption: (val: string) => void;
  maxMembers: string;
  setMaxMembers: (val: string) => void;   
}

const CircleFormSection = ({
  circleName,
  setCircleName,
  circleDescription,
  setCircleDescription,
  isPublic,
  setIsPublic,
  memberOption,
  setMemberOption,
  maxMembers,
  setMaxMembers,
}: CircleFormSectionProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const options = ["직접입력", "제한없음"];

  return (
    <div className="flex flex-col gap-6 p-4">


      {/* 1. 써클 이름  */}
      <BaseField 
          headline="써클 이름" 
          value={circleName} 
          onChange={setCircleName} 
          placeholder="써클 이름" 
          widthMode="fill" />

      {/* 2. 써클 인원수 */}
      <div className="flex flex-col gap-[8px] relative">
        <div className="sub-title-large-emphasized text-on-surface">써클 인원수</div>
        <div className="relative">
          <div 
            onClick={() => memberOption === "제한없음" && setIsSelectOpen(!isSelectOpen)}
            className={clsx(
              "h-[60px] bg-surface-variant-high px-[24px] flex items-center justify-between transition-all rounded-medium",
              memberOption === "제한없음" ? "cursor-pointer hover:bg-state-layer-secondary-opacity-8" : "cursor-default"
            )}
          >
            <div className="flex-1 h-full flex items-center">
              {memberOption === "직접입력" ? (
                <input
                  type="number"
                  min="1"        // 최소 1명
                  value={maxMembers}
                  onChange={(e) => {
                    const val = e.target.value;
                    // 음수 입력 방지 등 간단한 전처리 가능
                    if (Number(val) < 0) return;
                    setMaxMembers(val);
                  }}
                  placeholder="직접입력"
                  className="w-full bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant-lowest"
                  onFocus={() => setIsSelectOpen(false)} 
                />
              ) : (
                <span className="text-on-surface w-full h-full flex items-center">{memberOption}</span>
              )}
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); setIsSelectOpen(!isSelectOpen); }} className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-state-layer-secondary-opacity-8 rounded-full">
              <Icon name="arrow_down" size={14} className="text-on-surface-variant" />
            </button>
          </div>

          {/* 드롭다운 옵션 */}
          {isSelectOpen && (
            <div className="absolute top-[65px] left-0 w-full bg-surface rounded-medium z-20 overflow-hidden shadow-lg border-none">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setMemberOption(option); // props 함수 사용
                    setIsSelectOpen(false);
                    if (option === "제한없음") setMaxMembers(""); 
                  }}
                  className="h-[48px] px-[24px] flex items-center transition-colors hover:bg-state-layer-secondary-opacity-8 cursor-pointer"
                >
                  <div className="w-[32px] flex items-center shrink-0">
                    {memberOption === option && <Icon name="check" size={20} className="text-on-surface" />}
                  </div>
                  <span className="text-sub-title-medium text-on-surface">{option}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. 써클 소개 */}
      <TextAreaField headline="써클 소개" 
          value={circleDescription}
          onChange={setCircleDescription} 
          placeholder="띄어쓰기 포함 300자 이내 작성해주세요" 
          widthMode="fill" 
          showCounter 
          maxLength={300} 
          className="h-[220px]" />


      {/* 4. 공개 범위  */}
      <div className="flex gap-2">
        <Checkbox checked={isPublic} onChange={() => setIsPublic(true)}>공개</Checkbox>
        <Checkbox checked={!isPublic} onChange={() => setIsPublic(false)}>비공개</Checkbox>
      </div>


    </div>
  );
};

export default CircleFormSection;