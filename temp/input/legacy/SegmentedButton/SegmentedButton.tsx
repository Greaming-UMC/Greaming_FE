import clsx from "clsx";
import type { SegmentedButtonProps } from "./SegmentedButton.types";

export const SegmentedButton = ({
  options,
  value,
  onChange,
  tone = "neutral",
  disabled,
  className,
}: SegmentedButtonProps) => {
  return (
    <div
      role="radiogroup"
      aria-disabled={disabled || undefined}
      className={clsx(
        "inline-flex items-center gap-0",
        className
      )}
    >
      {options.map((opt, idx) => {
        const selected = opt.value === value;
        const isDisabled = disabled || opt.disabled;

        const selectedTextColor =
          tone === "accent"
            ? "text-[var(--color-secondary)]"
            : "text-[var(--color-primary)]";

        return (
          <div key={opt.value} className="inline-flex items-center">
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(opt.value)}
              className={clsx(
                "label-xxlarge-emphasized",
                "px-1 py-0",
                "transition-colors",
                selected
                  ? selectedTextColor
                  : "text-[var(--color-on-surface-variant-low)]",
                selected && "font-bold",
                isDisabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {opt.label}
            </button>

            {/* 구분자 | */}
            {idx !== options.length - 1 && (
              <span className="mx-2 text-[var(--color-on-surface-variant-low)]">
                |
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
