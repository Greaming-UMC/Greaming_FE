import type { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export type TextAreaFieldVariant = "fixed300" | "hug350";

export interface TextAreaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  variant?: TextAreaFieldVariant;
  className?: string;
}

const VARIANT_CLASS: Record<TextAreaFieldVariant, string> = {
  fixed300: "h-[300px]",
  hug350: "min-h-[350px]",
};

export const TextAreaField = ({
  value,
  onChange,
  variant = "fixed300",
  className,
  maxLength,
  ...props
}: TextAreaFieldProps) => {
  return (
    <div
      className={clsx(
        "bg-surface rounded-[10px] flex flex-col gap-[12px] p-[12px] box-border",
        VARIANT_CLASS[variant],
        className,
      )}
    >
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={maxLength}
        className="w-full flex-1 resize-none bg-transparent outline-none body-large-emphasized placeholder:text-on-surface-variant-lowest overflow-y-auto"
        {...props}
      />
      {typeof maxLength === "number" && (
        <div className="flex justify-end label-medium text-on-surface-variant-lowest">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
  );
};
