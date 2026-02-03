// StepIndicator.tsx
import clsx from "clsx";
import type { CSSProperties } from "react";

export function StepIndicator({
  current,
  total,
  className = "",
  style,
}: {
  current: number;
  total: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-[72px]",
        className,
      )}
      style={style}
    >
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const active = idx === current;

        return (
          <div
            key={idx}
            className={clsx(
              "w-[44px] h-[44px] rounded-full flex items-center justify-center text-center",
              "font-['ABeeZee'] text-[20px] font-[400] leading-[26px] tracking-[0px]",
              active
                ? "bg-[var(--Schemes-Secondary,#C8FF2E)] text-[var(--Schemes-On-Surface,#121315)]"
                : "bg-[var(--Schemes-Surface,#FCFCFC)] text-[rgba(18,19,21,0.70)]"
            )}
          >
            {idx}
          </div>

        );
      })}
    </div>
  );
}
