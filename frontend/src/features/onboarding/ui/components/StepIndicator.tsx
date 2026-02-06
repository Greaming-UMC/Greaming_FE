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
  const base =
    "w-[44px] h-[44px] rounded-full flex items-center justify-center text-center";

  const typo =
    "font-['ABeeZee'] text-[20px] font-[400] leading-[26px] tracking-[0px]";

  // 상태 클래스만 분리
  const activeCls =
    "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]";
  const inactiveCls =
    "bg-[var(--color-surface)] text-[var(--color-on-surface-variant-dim)]";

  return (
    <div
      className={clsx("flex items-center justify-center gap-[72px]", className)}
      style={style}
    >
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const active = idx === current;

        return (
          <div key={idx} className={clsx(base, typo, active ? activeCls : inactiveCls)}>
            {idx}
          </div>
        );
      })}
    </div>
  );
}
