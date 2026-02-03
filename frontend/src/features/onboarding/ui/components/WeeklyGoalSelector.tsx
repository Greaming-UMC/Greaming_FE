import type { HTMLAttributes } from "react";
import clsx from "clsx";

type Props = {
  value: number | null;
  onChange: (v: number) => void;
  disabled?: boolean;
  options?: number[];
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

const DEFAULT_OPTIONS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export function WeeklyGoalSelector({
  value,
  onChange,
  disabled = false,
  options = DEFAULT_OPTIONS,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={clsx(
        // Figma: 666 x 111 / radius 16 / surface / border / shadow
        "w-[666px] h-[111px] rounded-[16px] px-[16px] py-[8px]",
        "flex flex-col justify-center gap-[10px]",
        "bg-[var(--Schemes-Surface,#FCFCFC)]",
        "border border-[rgba(18,19,21,0.10)]",
        "shadow-[0_4px_0_rgba(18,19,21,0.25)]",
        className,
      )}
      {...rest}
    >
      <div className="label-large-emphasized text-on-surface">
        주간 목표 점수 설정
      </div>

      {/* 트랙(회색 pill) */}
      <div
        className={clsx(
          "w-full h-[44px] rounded-full px-[10px]",
          "flex items-center justify-between",
          "bg-[var(--Schemes-On-Surface-Variant-Lowest,#E7E7E7)]",
          "overflow-hidden",
          disabled && "opacity-40 cursor-not-allowed",
        )}
        aria-disabled={disabled || undefined}
      >
        {options.map((g) => {
          const selected = value === g;

          return (
            <button
              key={g}
              type="button"
              disabled={disabled}
              onClick={() => onChange(g)}
              className={clsx(
                // 원 크기 고정 + 전역 button 스타일 차단
                "flex-none shrink-0 p-0",
                "w-[34px] h-[34px] rounded-full",
                "inline-flex items-center justify-center",
                "border transition",
                selected
                  ? "bg-[var(--Schemes-Primary,#121315)] border-transparent"
                  : "bg-[var(--Schemes-Surface,#FCFCFC)] border-[rgba(18,19,21,0.12)]",
              )}
            >
              <span
                className="label-medium"
                style={{
                  fontWeight: 700,
                  color: selected
                    ? "var(--Schemes-Secondary,#C8FF2E)"
                    : "rgba(18,19,21,0.35)",
                }}
              >
                {g}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
