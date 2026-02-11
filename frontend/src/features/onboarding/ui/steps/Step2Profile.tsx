import { useMemo, useState } from "react";
import { Button } from "../../../../components/common/input/Button/Button";
import { DupCheckField } from "../../../../components/common/input/InputField/DupCheckField";
import { OnboardingTagChip } from "../../../../components/common/display/OnboardingTagChip";

type NicknameStatus = "unchecked" | "invalid" | "valid";

type Props = {
  nickname: string;
  onChangeNickname: (v: string) => void;

  intro: string;
  onChangeIntro: (v: string) => void;

  fieldTags: string[];
  onChangeFieldTags: (next: string[]) => void;

  styleTag: string | null;
  onChangeStyleTag: (next: string | null) => void;

  onPrev: () => void;
  onNext: () => void;
};

const MAX_NICKNAME_LEN = 8;
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

function StatusIcon({ type }: { type: "success" | "error" | "warning" }) {
  if (type === "success") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="var(--color-secondary-variant, #85B31A)"
          strokeWidth="2"
        />
        <path
          d="M7 12.5l3 3 7-7"
          stroke="var(--color-secondary-variant, #85B31A)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--color-error, #FF5A5A)"
        strokeWidth="2"
      />
      <path
        d="M12 7v7"
        stroke="var(--color-error, #FF5A5A)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1.2" fill="var(--color-error, #FF5A5A)" />
    </svg>
  );
}

export function Step2Profile({
  nickname,
  onChangeNickname,
  intro,
  onChangeIntro,
  fieldTags,
  onChangeFieldTags,
  styleTag,
  onChangeStyleTag,
  onPrev,
  onNext,
}: Props) {
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("unchecked");
  void intro;
  void onChangeIntro;
  void onPrev;

  /* ---------------- Nickname: 8자 제한 + 상태 초기화 ---------------- */
  const handleNicknameChange = (v: string) => {
    if (v.length > MAX_NICKNAME_LEN) return;
    onChangeNickname(v);
    setNicknameStatus("unchecked");
  };

  /* ---------------- 중복확인 (데모 로직) ---------------- */
  const handleCheckNickname = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    setCheckingNickname(true);
    try {
      // TODO: API 연결
      const lower = trimmed.toLowerCase();
      const ok = !(lower === "admin" || lower === "test");
      setNicknameStatus(ok ? "valid" : "invalid");
    } finally {
      setCheckingNickname(false);
    }
  };
  /* ---------------- 상태 메시지(3가지 케이스) ---------------- */
  const nicknameUI = useMemo(() => {
    if (nickname.trim().length === 0) return null;

    if (nicknameStatus === "unchecked") {
      return { kind: "warning" as const, text: "닉네임 중복확인을 해주세요." };
    }
    if (nicknameStatus === "invalid") {
      return { kind: "error" as const, text: "사용할 수 없는 닉네임입니다." };
    }
    return { kind: "success" as const, text: "사용할 수 있는 닉네임입니다." };
  }, [nickname, nicknameStatus]);
  /* ---------------- 분야: 1~4 ---------------- */
  const isFieldMax = fieldTags.length >= MAX_FIELD;

  const toggleFieldTag = (tag: string) => {
    const exists = fieldTags.includes(tag);
    if (exists) return onChangeFieldTags(fieldTags.filter((t) => t !== tag));
    if (fieldTags.length >= MAX_FIELD) return;
    onChangeFieldTags([...fieldTags, tag]);
  };
  /* ---------------- 스타일: 1개 선택 ---------------- */
  const selectStyleTag = (tag: string) => {
    onChangeStyleTag(styleTag === tag ? null : tag);
  };
  /* ---------------- 다음 활성 조건 ---------------- */
  const canNext =
    nickname.trim().length > 0 &&
    nicknameStatus === "valid" &&
    fieldTags.length >= 1 &&
    styleTag !== null;

  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      {/* Title */}
      <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
        당신을 소개해주세요.
      </h2>

      {/* Nickname */}
      <div className="w-full flex flex-col gap-[12px]">
        <div className="w-[666px] flex items-center justify-between">
          <div className="sub-title-large-emphasized text-on-surface">닉네임</div>

          {nicknameUI && (
            <div className="flex items-center gap-[8px]">
              <StatusIcon type={nicknameUI.kind} />
              <span
                className={[
                  "label-large-emphasized",
                  nicknameUI.kind === "success" ? "text-secondary-variant" : "text-error",
                ].join(" ")}
              >
                {nicknameUI.text}
              </span>
            </div>
          )}
        </div>

        <DupCheckField
          value={nickname}
          onChange={handleNicknameChange}
          onCheck={handleCheckNickname}
          placeholder="띄어쓰기 포함 8자 이내로 작성해주세요."
          checking={checkingNickname}
          className={`
            w-[666px]
            gap-[8px]
            bg-on-surface-variant-highest

            [&>button]:!w-[80px]
            [&>button]:!h-[32px]
            [&>button]:!rounded-[28px]
            [&>button]:!bg-surface-variant-lowest
            [&>button]:!opacity-100

            [&>button>span]:!text-on-surface-variant-bright
            [&>button>span]:!text-[13px]
            [&>button>span]:!font-[500]
            [&>button>span]:!leading-none
            [&>button>span]:!whitespace-nowrap
          `}
        />
      </div>

      {/* Skills */}
      <div className="w-full flex flex-col gap-[16px]">
        <div className="flex items-end justify-between w-[666px]">
          <div className="sub-title-large-emphasized text-on-surface">내 특기 선택</div>
        </div>

        {/* 분야 */}
        <div className="w-full flex flex-col gap-[10px]">
          <div className="w-[666px] flex items-end justify-between">
            <div className="label-large-emphasized text-on-surface">분야</div>
            <div className="label-large text-on-surface-variant-lowest">
              최소 1개 최대 4개
            </div>
          </div>

          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {FIELD_TAGS.map((tag) => {
              const selected = fieldTags.includes(tag);
              const disabled = !selected && isFieldMax;

              return (
                <OnboardingTagChip
                  key={tag}
                  label={`#${tag}`}
                  selected={selected}
                  disabled={disabled}
                  onClick={() => !disabled && toggleFieldTag(tag)}
                />
              );
            })}
          </div>
        </div>

        {/* 스타일 */}
        <div className="w-full flex flex-col gap-[10px]">
          <div className="w-[666px] flex items-end justify-between">
            <div className="label-large-emphasized text-on-surface">스타일</div>
            <div className="label-large text-on-surface-variant-lowest">1개 선택</div>
          </div>

          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {STYLE_TAGS.map((tag) => {
              const selected = styleTag === tag;

              return (
                <OnboardingTagChip
                  key={tag}
                  label={`#${tag}`}
                  selected={selected}
                  onClick={() => selectStyleTag(tag)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex items-center justify-between">
        <Button
          size="2xl"
          shape="square"
          variant={canNext ? "primary" : "surfaceVariant"}
          className="w-[666px]"
          onClick={onNext}
          disabled={!canNext}
          color="gray"
        >
          다음
        </Button>
      </div>
    </div>
  );
}
