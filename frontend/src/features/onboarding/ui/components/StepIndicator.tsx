import clsx from "clsx";

type Props = {
  current: number;
  total: number;
  className?: string; 
};

export function StepIndicator({ current, total, className }: Props) {
  const base =
    "w-[44px] h-[44px] rounded-full flex items-center justify-center text-center";

  const typo =
    "font-['ABeeZee'] text-[20px] font-[400] leading-[26px] tracking-[0px]";

  const activeCls = "bg-secondary text-on-secondary";
  const inactiveCls = "bg-surface text-on-surface-variant-dim";

  return (
    <div className={clsx("flex items-center justify-center gap-[72px]", className)}>
      {Array.from({ length: total }).map((_, i) => {
        const idx = i + 1;
        const active = idx === current;

        return (
          <div
            key={idx}
            className={clsx(base, typo, active ? activeCls : inactiveCls)}
          >
            {idx}
          </div>
        );
      })}
    </div>
  );
}
