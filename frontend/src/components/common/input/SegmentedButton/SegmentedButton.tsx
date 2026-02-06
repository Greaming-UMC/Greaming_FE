import { Fragment, forwardRef } from "react";
import clsx from "clsx";
import { Divider } from "../../display";
import type { SegmentedButtonProps } from "./SegmentedButton.types";

export const SegmentedButton = forwardRef<
  HTMLDivElement,
  SegmentedButtonProps
>(
  (
    {
      options,
      value,
      onChange,
      variant = "primary",
      disabled,
      className,
      displayClassName = "main-title-small-emphasized",
    },
    ref,
  ) => {
    const dividerColor =
      variant === "secondary" ? "bg-surface" : "bg-on-surface";
    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-disabled={disabled || undefined}
        className={clsx("inline-flex items-center gap-0", className)}
      >
        {options.map((opt, idx) => {
          const selected = opt.value === value;
          const isDisabled = disabled || opt.disabled;

          const selectedTextColor =
            variant === "secondary" ? "text-secondary" : "text-primary";
          const stateLayerClass =
            variant === "secondary"
              ? "secondary-opacity-8"
              : "primary-opacity-8";

          return (
            <Fragment key={opt.value}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={isDisabled}
                onClick={() => !isDisabled && onChange(opt.value)}
                className={clsx(
                  displayClassName,
                  "px-[16px] py-[4px] state-layer rounded-full",
                  "transition-colors",
                  stateLayerClass,
                  selected
                    ? selectedTextColor
                    : "text-on-surface-variant-lowest",
                  isDisabled && "opacity-40 cursor-not-allowed",
                )}
              >
                {opt.label}
              </button>

              {idx !== options.length - 1 && (
                <Divider
                  orientation="vertical"
                  thickness={1}
                  color={dividerColor}
                  className="w-[1px]"
                  style={{ height: "18px" }}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    );
  },
);

SegmentedButton.displayName = "SegmentedButton";
