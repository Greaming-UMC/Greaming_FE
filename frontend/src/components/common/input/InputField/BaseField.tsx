import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";
import { Button } from "../Button";

export type BaseFieldWidthMode = "fixed" | "fill";
export type BaseFieldHeightMode = "fixed" | "fill";
export type BaseFieldTone = "surface" | "surfaceVariantHigh";

export type BaseFieldAction = {
  label: string;
  onClick: () => void;
  variant?: "onPrimary" | "outlined";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export const BASE_FIELD_TONE_CLASS: Record<BaseFieldTone, string> = {
  surface: "bg-surface",
  surfaceVariantHigh: "bg-surface-variant-high",
};

export interface BaseFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  headline?: string;
  value: string;
  onChange: (value: string) => void;
  widthMode?: BaseFieldWidthMode;
  heightMode?: BaseFieldHeightMode;
  tone?: BaseFieldTone;
  showCounter?: boolean;
  action?: BaseFieldAction;
  className?: string;
}

export const BaseField = forwardRef<HTMLInputElement, BaseFieldProps>(
  (
    {
      headline,
      value,
      onChange,
      widthMode = "fixed",
      heightMode = "fixed",
      tone = "surfaceVariantHigh",
      showCounter = false,
      action,
      className,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const hasAction = Boolean(action);
    const actionVariant = action?.variant ?? "onPrimary";
    const hasCounter = showCounter && typeof maxLength === "number";

    if (import.meta.env.DEV && showCounter && typeof maxLength !== "number") {
      console.warn("[BaseField] showCounter는 maxLength가 필요합니다.");
    }

    const rootClassName = clsx(
      "flex flex-col gap-[8px]",
      widthMode === "fill" && "w-full",
    );

    const fieldWrapperClassName = clsx(
      BASE_FIELD_TONE_CLASS[tone],
      heightMode === "fill" ? "h-full" : "h-[60px]",
      "rounded-medium px-[24px]",
      "flex items-center gap-2 relative",
      widthMode === "fill" && "w-full",
    );

    const inputClassName = clsx(
      "flex-1 bg-transparent",
      "placeholder:text-on-surface-variant-lowest",
      "outline-none",
      className,
    );

    const counterClassName = clsx(
      "absolute bottom-[12px] right-[24px]",
      "label-medium text-on-surface-variant-lowest",
      "pointer-events-none",
    );

    const actionClassName = action?.className;

    return (
      <div className={rootClassName}>
        <div className="sub-title-large-emphasized text-on-surface">
          {headline}
        </div>
        <div className={fieldWrapperClassName}>
          <input
            ref={ref}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            maxLength={maxLength}
            className={inputClassName}
            {...props}
          />
          {hasCounter && (
            <div className={counterClassName}>
              {value.length}/{maxLength}
            </div>
          )}
          {hasAction && (
            <Button
              size="xs"
              type={action?.type ?? "button"}
              onClick={action?.onClick}
              disabled={action?.disabled}
              variant={actionVariant}
              shape="round"
              widthMode="hug"
              textClassName="label-large-emphasized"
              className={actionClassName}
            >
              {action?.label}
            </Button>
          )}
        </div>
      </div>
    );
  },
);

BaseField.displayName = "BaseField";
