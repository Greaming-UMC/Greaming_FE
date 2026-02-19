import clsx from "clsx";
import type { ArtField, ArtStyle } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";
import { Button } from "../../../../components/common/input/Button/Button";
import { OnboardingTagChip } from "../../../../components/common/display/OnboardingTagChip";

interface Props {
  interestFields: ArtField[];
  onChangeInterestFields: (tag: ArtField) => void; // 부모의 toggleTag('interests', tag) 연결
  interestStyle: ArtStyle | null;
  onChangeInterestStyle: (style: ArtStyle) => void; // 부모의 setArtStyle('interests', style) 연결
  onPrev: () => void;
  onNext: () => void;
}

const MAX_FIELD = 4;
const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

export function Step3Interests({
  interestFields,
  onChangeInterestFields,
  interestStyle,
  onChangeInterestStyle,
  onPrev,
  onNext,
}: Props) {
  
    const isFieldMax = interestFields.length >= MAX_FIELD;

    const canNext = (() => {
      const hasField = interestFields.length >= 1;
      const hasStyle = interestStyle !== null && STYLE_KEYS.includes(interestStyle);
      return hasField && hasStyle;
    })();


  const prevBtnClass =
  "w-[82px] h-[60px] rounded-[10px] flex items-center justify-center bg-surface-variant-high";


  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
        어떤 분야에 관심있나요?
      </h2>

      <div className="w-[658px] flex flex-col gap-[8px]">
        <div className="sub-title-large-emphasized text-on-surface">
          관심있는 해시태그 선택
        </div>
      </div>

      <div className="w-full flex flex-col gap-[16px]">
        {/* 관심 분야 */}
        <div className="w-[666px] flex items-end justify-between">
          <div className="label-large-emphasized text-on-surface">분야</div>
           <div className="label-xlarge text-on-surface-variant-lowest">최소 1개 최대 4개</div>
        </div>

        <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
          {FIELD_KEYS.map((key) => {
            const selected = interestFields.includes(key);
            const disabled = !selected && isFieldMax;

            return (
              <OnboardingTagChip
                key={key}
                label={`#${ART_FIELD_LABEL[key]}`} 
                selected={selected}
                disabled={disabled}
                onClick={() => !disabled && onChangeInterestFields(key)}
              />
            );
          })}
        </div>

        {/* 관심 스타일 */}
        <div className="w-[666px] flex items-end justify-between mt-[8px]">
          <div className="label-large-emphasized text-on-surface">스타일</div>
          <div className="label-xlarge text-on-surface-variant-lowest">1개 선택</div>
        </div>

        <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
          {STYLE_KEYS.map((key) => {
            const selected = interestStyle === key;

            return (
              <OnboardingTagChip
                key={key}
                label={`#${ART_STYLE_LABEL[key]}`} 
                selected={selected}
                onClick={() => onChangeInterestStyle(key)}
              />
            );
          })}
        </div>
      </div>

      <div className="h-[90px]" />

      {/* 하단 버튼 영역 */}
      <div className="w-full flex items-center justify-between">
        <button type="button" onClick={onPrev} className={prevBtnClass}>
          <span className="text-on-surface-variant-lowest label-xlarge">
            이전
          </span>
        </button>

        <Button
          size="2xl"
          shape="square"
          variant={canNext ? "primary" : "surfaceVariant"}
          className={clsx(
            "w-[572px] h-[60px]",
            "rounded-[6.465px]",
            !canNext && "bg-surface-variant-low"
          )}
          onClick={onNext}
          disabled={!canNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}