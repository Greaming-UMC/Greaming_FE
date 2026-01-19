import clsx from "clsx";

type Variant = "fixed300" | "hug350";

export interface TextAreaFieldProps {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  variant: Variant;

  /** 상단 라벨이 필요할 때 */
  label?: string;

  /** TextField처럼 상태 표현 옵션 */
  disabled?: boolean;
  error?: boolean;
}

const STYLE = {
  fixed300: {
    width: 494,
    height: 214,
    padding: "12px",
  },
  hug350: {
    width: 666,
    // Hug라 height는 고정 안 함
    padding: "20px 24px 8px 24px",
    //  “짧은 입력칸”처럼 보이게 최소/최대 높이(원하면 조절)
    textareaMinHeight: 18,   // 글 한 줄 정도
    textareaMaxHeight: 60,   // 이 이상은 스크롤 (원하면 44~80 등으로 조절)
  },
} as const;

export const TextAreaField = ({
  value,
  onChange,
  maxLength,
  placeholder,
  variant,
  label,
  disabled = false,
  error = false,
}: TextAreaFieldProps) => {
  const style = STYLE[variant];
  const reached = value.length >= maxLength;

  const isFixed = variant === "fixed300";
  const isHug = variant === "hug350";

  return (
    <div className="flex flex-col gap-2" style={{ width: style.width }}>
      {/* 상단 라벨 (필요할 때만 표시) */}
      {label ? (
        <div className="flex items-center">
          <span
            className={clsx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 label-medium",
              "bg-surface text-on-surface"
            )}
            style={{ border: "1px solid var(--color-outline-variant)" }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--color-primary)" }}
            />
            {label}
          </span>
        </div>
      ) : null}

      {/* textarea container */}
      <div
        className={clsx(
          "flex flex-col rounded-medium",
          "bg-(--color-surface-variant-high)",  
          "state-layer surface-variant-opacity-16",
          disabled && "opacity-50"
        )}
        style={{
          height: "height" in style ? style.height : "auto",
          padding: style.padding,
          boxSizing: "border-box",
        }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={clsx(
            "w-full resize-none bg-transparent outline-none body-medium",
            "placeholder:text-on-surface-variant-low",
            //  핵심: textarea는 항상 위에서부터 시작(기본 동작)
            //  내용이 길어질 때 스크롤이 생기게 overflow-y-auto
            isFixed ? "flex-1 overflow-y-auto" : "overflow-y-auto"
          )}
          style={
            isHug
              ? {
                  minHeight: STYLE.hug350.textareaMinHeight,
                  maxHeight: STYLE.hug350.textareaMaxHeight,
                }
              : undefined
          }
        />

        {/* 카운터 */}
        <div
          className={clsx(
            "flex justify-end label-medium",
            reached ? "text-error" : "text-on-surface-variant-low"
          )}
        >
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};
