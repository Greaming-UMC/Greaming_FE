import clsx from "clsx";

export interface DupCheckFieldProps {
  value: string;
  onChange: (v: string) => void;

  /** 버튼 클릭 시(중복확인) - 로직은 부모가 */
  onCheck: () => void;

  placeholder?: string;

  disabled?: boolean;
  checking?: boolean; // 로딩 상태 표현용
  className?: string;
}

export const DupCheckField = ({
  value,
  onChange,
  onCheck,
  placeholder = "띄어쓰기 포함 8자 이내로 작성해주세요.",
  disabled = false,
  checking = false,
  className,
}: DupCheckFieldProps) => {
  const canCheck = !disabled && !checking;

  return (
    <div
      className={clsx(
        "flex items-center justify-between",
        "rounded-[10px]",
        "bg-(--color-surface-variant-high)",
        "state-layer secondary-opacity-8",
        disabled && "opacity-50",
        className
      )}
      style={{
        width: 666,
        height: 59,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 24,
        paddingRight: 24,
        boxSizing: "border-box",
      }}
    >
      {/* 입력 */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "flex-1 bg-transparent outline-none",
          "font-medium text-[13px] leading-6", 
          "placeholder:text-on-surface-variant-lowest"
        )}
      />

      {/* 버튼 */}
    <button
        type="button"
        onClick={onCheck}
        disabled={!canCheck}
        className="shrink-0 rounded-full state-layer secondary-opacity-8"
        style={{
            width: 72,
            height: 23,
            background: "var(--color-outline)",
            opacity: canCheck ? 1 : 0.6,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
        }}
        aria-label="중복 확인"
        >
        <span
            style={{
            color: "#FFF",
            fontFamily: '"Pretendard Variable"',
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "normal",     
            whiteSpace: "nowrap",      // 줄바꿈 방지
            overflow: "hidden",        // 혹시 넘치면 숨김
            textOverflow: "clip",      
            }}
        >
            {checking ? "확인중" : "중복확인"}
        </span>
    </button>

    </div>
  );
};
