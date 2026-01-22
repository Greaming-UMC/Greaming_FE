import React from "react";
import clsx from "clsx";
import searchIcon from "../../../../assets/icon/search.svg";

export interface HashtagSearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;

  disabled?: boolean;
  className?: string;
}

export const HashtagSearchField = ({
  value,
  onChange,
  onSearch,
  disabled = false,
  className,
  placeholder = "원하는 해시태그를 입력해주세요",
  ...rest
}: HashtagSearchFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <div
      className={clsx(
        "flex items-center state-layer secondary-opacity-8",
        className
      )}
      style={{
        width: 405,
        height: 44,
        borderRadius: 26,
        padding: "15px 24px",
        background: "var(--color-surface-variant-low)", // Grayscale6
        boxSizing: "border-box",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "flex-1 bg-transparent outline-none body-medium",
          "placeholder:text-on-surface-variant-lowest"
        )}
        {...rest}
      />

      <button
        type="button"
        aria-label="해시태그 검색"
        disabled={disabled}
        onClick={() => onSearch?.()}
        className="shrink-0 ml-2 rounded-full state-layer secondary-opacity-8 flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
        }}
      >
        <img
          src={searchIcon}
          alt="search"
          width={18}
          height={18}
          className="block"
        />
      </button>
    </div>
  );
};
