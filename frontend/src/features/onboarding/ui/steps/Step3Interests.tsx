import { Button } from "../../../../components/common/input/Button/Button";

type Props = {
  interestFields: string[];
  onChangeInterestFields: (next: string[]) => void;

  interestStyle: string | null;
  onChangeInterestStyle: (next: string | null) => void;

  onPrev: () => void;
  onNext: () => void;
};

const MAX_FIELD = 4;

const FIELD_TAGS = [
  "일러스트",
  "풍경화",
  "인물화",
  "일상",
  "인사이솔",
  "캐릭터",
  "판타지",
  "추상화",
  "애니메이션",
  "수채화",
  "건축물",
  "연필",
  "동물",
  "전통미술",
  "팬아트",
  "꽃",
  "음식",
  "크로키",
] as const;

const STYLE_TAGS = ["컬러", "흑백", "귀여운", "공포", "디테일", "심플"] as const;

export function Step3Interests({
  interestFields,
  onChangeInterestFields,
  interestStyle,
  onChangeInterestStyle,
  onPrev,
  onNext,
}: Props) {
  const isFieldMax = interestFields.length >= MAX_FIELD;

  const toggleField = (tag: string) => {
    const exists = interestFields.includes(tag);
    if (exists) return onChangeInterestFields(interestFields.filter((t) => t !== tag));
    if (interestFields.length >= MAX_FIELD) return;
    onChangeInterestFields([...interestFields, tag]);
  };

  const toggleStyle = (tag: string) => {
    onChangeInterestStyle(interestStyle === tag ? null : tag);
  };

  const canNext = interestFields.length >= 1 && interestStyle !== null;


  const tagBtnBase =
    "w-[104px] h-[40px] rounded-[12px] px-0 flex items-center justify-center";
  const tagShadow = "shadow-[0_0_4px_0_rgba(18,19,21,0.20)]";


  const tagUnselected = "bg-surface text-on-surface";
  const tagSelected = "bg-primary text-secondary";
  const tagDisabled = "opacity-50 cursor-not-allowed";

  const prevBtnClass = "w-[82px] h-[60px] rounded-[10px] flex items-center justify-center";
  const prevBtnBg = "bg-on-surface-variant-low";
  const prevBtnText = "text-on-surface"; 

  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      <h2
        className="text-center"
        style={{
          color: "var(--color-primary, #121315)",
          fontFamily: "Pretendard",
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: "36px",
          margin: 0,
        }}
      >
        어떤 분야에 관심있나요?
      </h2>

      <div className="w-[658px] flex flex-col gap-[8px]">
        <div
          className="
            h-[20px]
            font-['Pretendard']
            text-[18px]
            font-[600]
            leading-[20px]
            tracking-[0.15px]
            text-on-surface
          "
        >
          관심있는 해시태그 선택
        </div>
      </div>

      <div className="w-full flex flex-col gap-[16px]">
        <div className="w-[666px] flex items-end justify-between">
          <div className="label-large-emphasized text-on-surface">분야</div>
          <div className="label-large text-on-surface-variant-lowest">최소 1개 최대 4개</div>
        </div>

        <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
          {FIELD_TAGS.map((tag) => {
            const selected = interestFields.includes(tag);
            const disabled = !selected && isFieldMax;

            return (
              <button
                key={tag}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && toggleField(tag)}
                className={[
                  tagBtnBase,
                  tagShadow,
                  selected ? tagSelected : tagUnselected,
                  disabled ? tagDisabled : "",
                ].join(" ")}
              >
                <span className="label-large-emphasized">#{tag}</span>
              </button>
            );
          })}
        </div>

        <div className="w-[666px] flex items-end justify-between mt-[8px]">
          <div className="label-large-emphasized text-on-surface">스타일</div>
          <div className="label-large text-on-surface-variant-lowest">1개 선택</div>
        </div>

        <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
          {STYLE_TAGS.map((tag) => {
            const selected = interestStyle === tag;

            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleStyle(tag)}
                className={[
                  tagBtnBase,
                  tagShadow,
                  selected ? tagSelected : tagUnselected,
                ].join(" ")}
              >
                <span className="label-large-emphasized">#{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-[90px]" />

      <div className="w-full flex items-center justify-between">
        <button type="button" onClick={onPrev} className={[prevBtnClass, prevBtnBg, prevBtnText].join(" ")}>
          <span
            className="
              font-['Pretendard']
              text-[16.161px]
              font-[500]
              leading-[21.01px]
              text-on-surface-variant-lowest
            "
          >
            이전
          </span>
        </button>

        <Button
          size="2xl"
          shape="square"
          variant={canNext ? "primary" : "surfaceVariant"}
          className={[
            "w-[572px] h-[60px]",
            "rounded-[6.465px]",
            !canNext ? "bg-surface-variant-low" : "",
          ].join(" ")}
          onClick={onNext}
          disabled={!canNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
