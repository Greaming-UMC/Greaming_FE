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
  headline?: string;
  value: string;
  onChange: (value: string) => void;
  widthMode?: BaseFieldWidthMode;
  heightMode?: BaseFieldHeightMode;
  height?: string; // 높이 직접 지정 프롭
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
      height,
      tone = "surfaceVariantHigh",
      showCounter = false,
      className,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const hasCounter = showCounter && typeof maxLength === "number";

    // 높이 결정 우선순위: height 프롭 > heightMode fill > 기본 240px
    const containerStyle = height 
      ? { height } 
      : heightMode === "fill" 
        ? { height: "100%" } 
        : { height: "240px" };

    return (
      <div className={clsx("flex flex-col gap-[8px]", widthMode === "fill" && "w-full")}>
        {headline && <div className="sub-title-large-emphasized text-on-surface">{headline}</div>}
        
        <div 
          style={containerStyle}
          className={clsx(
            BASE_FIELD_TONE_CLASS[tone],
            "rounded-medium px-[24px] py-[20px]", 
            "flex items-start gap-2 relative", 
            widthMode === "fill" && "w-full",
          )}
        >
          <textarea
            ref={ref}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            maxLength={maxLength}
            className={clsx(
              "flex-1 bg-transparent outline-none resize-none min-h-full label-large",
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