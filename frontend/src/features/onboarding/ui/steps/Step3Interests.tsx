import type { ArtField, ArtStyle } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";
import { Button } from "../../../../components/common/input/Button/Button";
import { OnboardingTagChip } from "../../../../components/common/display/OnboardingTagChip";

interface Props {
  tags: (ArtField | ArtStyle)[]; 
  onToggleTag: (tag: ArtField | ArtStyle) => void;
  onPrev: () => void;
  onNext: () => void;
}

const MAX_FIELD = 4;
const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

export function Step3Interests({ tags, onToggleTag, onPrev, onNext }: Props) {
  
  const selectedFields = tags.filter(tag => tag in ART_FIELD_LABEL);
  const isFieldMax = selectedFields.length >= MAX_FIELD;

  const hasStyle = tags.some(tag => tag in ART_STYLE_LABEL);

  const canNext = selectedFields.length >= 1 && hasStyle;

  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
        어떤 분야에 관심있나요?
      </h2>

      <div className="w-full flex flex-col gap-[16px]">
        {/* 관심 분야 섹션 */}
        <div className="w-[666px] flex items-end justify-between">
          <div className="label-large-emphasized text-on-surface">분야</div>
          <div className="label-large text-on-surface-variant-lowest">최소 1개 최대 4개</div>
        </div>
        <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
          {FIELD_KEYS.map((key) => {
            const selected = tags.includes(key);
            return (
              <OnboardingTagChip
                key={key}
                label={`#${ART_FIELD_LABEL[key]}`}
                selected={selected}
                disabled={!selected && isFieldMax}
                onClick={() => onToggleTag(key)}
              />
            );
          })}
        </div>

        {/* 관심 스타일 섹션 */}
        <div className="w-[666px] flex items-end justify-between mt-[8px]">
          <div className="label-large-emphasized text-on-surface">스타일</div>
          <div className="label-large text-on-surface-variant-lowest">1개 선택</div>
        </div>
        <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
          {STYLE_KEYS.map((key) => {
            const selected = tags.includes(key);
            return (
              <OnboardingTagChip
                key={key}
                label={`#${ART_STYLE_LABEL[key]}`}
                selected={selected}
                onClick={() => onToggleTag(key)}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-8">
        <button type="button" onClick={onPrev} className="w-[82px] h-[60px] rounded-[10px] bg-on-surface-variant-low flex items-center justify-center text-on-surface-variant-lowest label-xlarge">
          이전
        </button>
        <Button
          size="2xl"
          shape="square"
          variant={canNext ? "primary" : "surfaceVariant"}
          className="w-[572px] h-[60px] !rounded-[10px]"
          onClick={onNext}
          disabled={!canNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}