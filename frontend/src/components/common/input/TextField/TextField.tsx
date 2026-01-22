import React from "react";
import clsx from "clsx";

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;

  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const TextField = ({
  value,
  onChange,
  disabled = false,
  error = false,
  className,
  placeholder,
  ...rest
}: TextFieldProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  
  const bgColor =
    hovered || focused
      ? "var(--color-outline-variant)"          
      : "var(--color-surface-variant-high)";    

  return (
    <div
      className={clsx("flex items-center rounded-[10px]", className)}
      style={{
        width: 494,
        height: 51,
        padding: 12,
        background: bgColor,
        boxSizing: "border-box",
        border: "1px solid",
        borderColor: error ? "var(--color-error)" : "transparent",
        transition: "background-color 150ms ease",
        opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "w-full bg-transparent outline-none",
          "font-medium text-[16px] leading-6", // 기본 input 텍스트
          "placeholder:text-on-surface-variant-lowest"
        )}
        {...rest}
      />
    </div>
  );
};
