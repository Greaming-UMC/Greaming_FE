import { useMemo, useState } from "react";
import { Button } from "../../../../components/common/input/Button/Button";
import {DupCheckField} from "../../../../../../temp/input/legacy/DupCheckField/DupCheckField.tsx";

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

/** 아이콘(24x24) - 외부 에셋 없이 inline */
function StatusIcon({
  type,
}: {
  type: "success" | "error" | "warning";
}) {
  if (type === "success") {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="var(--Schemes-Secondary-Variant,#9ACD32)" strokeWidth="2" />
        <path d="M7 12.5l3 3 7-7" stroke="var(--Schemes-Secondary-Variant,#9ACD32)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // error/warning은 빨간 느낌(피그마가 Error)
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="var(--Schemes-Error,#FF5A5A)" strokeWidth="2" />
      <path d="M12 7v7" stroke="var(--Schemes-Error,#FF5A5A)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1.2" fill="var(--Schemes-Error,#FF5A5A)" />
    </svg>
  );
}

export function Step2Profile({
  nickname,
  onChangeNickname,
  fieldTags,
  onChangeFieldTags,
  styleTag,
  onChangeStyleTag,
  onPrev,
  onNext,
}: Props) {
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus>("unchecked");

  /* ---------------- Nickname: 8자 제한 + 상태 초기화 ---------------- */
  const handleNicknameChange = (v: string) => {
    if (v.length > MAX_NICKNAME_LEN) return; //  초과 입력 차단
    onChangeNickname(v);
    setNicknameStatus("unchecked"); //  변경 시 다시 확인 필요
  };

  /* ---------------- 중복확인 (데모 로직) ---------------- */
  const handleCheckNickname = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) return;

    setCheckingNickname(true);
    try {
      // TODO: API 연결
      // 데모: admin/test 불가
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
      return {
        kind: "warning" as const,
        text: "닉네임 중복확인을 해주세요.",
      };
    }
    if (nicknameStatus === "invalid") {
      return {
        kind: "error" as const,
        text: "사용할 수 없는 닉네임입니다.",
      };
    }
    return {
      kind: "success" as const,
      text: "사용할 수 있는 닉네임입니다.",
    };
  }, [nickname, nicknameStatus]);

  /* ---------------- 분야: 1~4 ---------------- */
  const isFieldMax = fieldTags.length >= MAX_FIELD;

  const toggleFieldTag = (tag: string) => {
    const exists = fieldTags.includes(tag);
    if (exists) {
      onChangeFieldTags(fieldTags.filter((t) => t !== tag));
      return;
    }
    if (fieldTags.length >= MAX_FIELD) return; // 최대면 추가 불가
    onChangeFieldTags([...fieldTags, tag]);
  };

  /* ---------------- 스타일: 1개 선택 ---------------- */
  const selectStyleTag = (tag: string) => {
    onChangeStyleTag(styleTag === tag ? null : tag);
  };

  /* ---------------- 다음 활성 조건 ---------------- */
  const canNext =
    nickname.trim().length > 0 &&
    nicknameStatus === "valid" && // 중복확인 
    fieldTags.length >= 1 &&       //  분야 최소 1
    styleTag !== null;             //  스타일 1개

  const tagBtnBase =
    "w-[104px] h-[40px] rounded-[12px] px-0 flex items-center justify-center";
  const tagShadow = "shadow-[0_0_4px_0_rgba(18,19,21,0.20)]"; // blur bright

  
  const tagUnselected =
    "bg-[var(--Schemes-Surface,#FCFCFC)] text-[var(--Schemes-On-Surface,#121315)]";

  const tagSelected =
    "bg-[var(--Schemes-Primary,#121315)] text-[var(--Schemes-Secondary,#C8FF2E)]";

  const tagDisabled = "opacity-50 cursor-not-allowed";

  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      {/* Title */}
      <h2
        className="text-center"
        style={{
          color: "var(--Schemes-Primary, #121315)",
          fontFamily: "Pretendard",
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: "36px",
          margin: 0,
        }}
      >
        당신을 소개해주세요.
      </h2>

      {/* Nickname */}
      <div className="w-full flex flex-col gap-[12px]">
        {/* 라벨 + 상태(오른쪽) */}
        <div className="w-[666px] flex items-center justify-between">
          <div className="sub-title-large-emphasized text-on-surface">닉네임</div>

          {nicknameUI && (
            <div className="flex items-center gap-[8px]">
              <StatusIcon type={nicknameUI.kind} />
              <span
                className="label-large-emphasized"
                style={{
                  color:
                    nicknameUI.kind === "success"
                      ? "var(--Schemes-Secondary-Variant,#9ACD32)"
                      : "var(--Schemes-Error,#FF5A5A)",
                }}
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
        bg-[var(--Schemes-On-Surface-Variant-High-2,#F3F3F3)]

        /* 버튼(두 번째 자식) 스타일 덮어쓰기 */
        [&>button]:!w-[80px]
        [&>button]:!h-[32px]
        [&>button]:!rounded-[28px]
        [&>button]:!bg-[var(--Schemes-Surface-Variant-lowest,#545556)]
        [&>button]:!opacity-100

        /* 버튼 텍스트(버튼 안 span) */
        [&>button>span]:!text-white
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
            {/* <div className="label-medium text-on-surface-variant-lowest">
              {fieldTags.length}/4 선택
                          </div> */}
            <div className="label-large text-on-surface-variant-lowest">
            최소 1개 최대 4개
          </div>
          </div>

        
          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {FIELD_TAGS.map((tag) => {
              const selected = fieldTags.includes(tag);
              const disabled = !selected && isFieldMax;

              return (
                <button
                  key={tag}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && toggleFieldTag(tag)}
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
                <button
                  key={tag}
                  type="button"
                  onClick={() => selectStyleTag(tag)}
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