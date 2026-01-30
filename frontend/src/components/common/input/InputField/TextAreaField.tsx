import { forwardRef, type TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { 
  BASE_FIELD_TONE_CLASS, 
  type BaseFieldWidthMode, 
  type BaseFieldHeightMode, 
  type BaseFieldTone 
} from "./BaseField"; 

export interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  headline: string;
  value: string;
  onChange: (value: string) => void;
  widthMode?: BaseFieldWidthMode;
  heightMode?: BaseFieldHeightMode;
  tone?: BaseFieldTone;
  showCounter?: boolean;
  className?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      headline,
      value,
      onChange,
      widthMode = "fixed",
      heightMode = "fixed",
      tone = "surfaceVariantHigh",
      showCounter = false,
      className,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const hasCounter = showCounter && typeof maxLength === "number";

    return (
      <div className={clsx("flex flex-col gap-[8px]", widthMode === "fill" && "w-full")}>
        <div className="sub-title-large-emphasized text-on-surface">{headline}</div>
        
        <div className={clsx(
          BASE_FIELD_TONE_CLASS[tone],
          heightMode === "fill" ? "h-full" : "h-[240px]",
          "rounded-medium px-[24px] py-[20px]", 
          "flex items-start gap-2 relative", 
          widthMode === "fill" && "w-full",
        )}>
          <textarea
            ref={ref}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            maxLength={maxLength}
            className={clsx(
              "flex-1 bg-transparent outline-none resize-none min-h-full",
              "placeholder:text-on-surface-variant-lowest",
              className,
            )}
            {...props}
          />
          {hasCounter && (
            <div className="absolute bottom-[12px] right-[24px] label-medium text-on-surface-variant-lowest">
              {value.length}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  },
);

TextAreaField.displayName = "TextAreaField";