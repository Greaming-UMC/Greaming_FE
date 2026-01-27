import React from "react";
import clsx from "clsx";
import searchIcon from "../../../../assets/icon/search.svg";


export interface SearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;

  /** 엔터/아이콘 클릭 시 검색 트리거 */
  onSearch?: () => void;

  disabled?: boolean;
  className?: string;
}

export const SearchField = ({
  value,
  onChange,
  onSearch,
  disabled = false,
  className,
  placeholder = "써클 검색하기",
  ...rest
}: SearchFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <div
      className={clsx("flex items-center state-layer secondary-opacity-8", className)}
      style={{
        width: 376,
        height: 35,
        borderRadius: 18.5,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 19,
        paddingRight: 19,
        background: "var(--color-surface-variant-high)", // Grayscale7
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
        aria-label="검색"
        disabled={disabled}
        onClick={() => onSearch?.()}
        className="shrink-0 ml-2 state-layer secondary-opacity-8 rounded-full flex items-center justify-center"
        style={{
          width: 24,
          height: 24,
        }}
      >
        <img
          src={searchIcon}
          alt=""
          aria-hidden="true"
          style={{
            width: 18,
            height: 18,
            display: "block",
          }}
        />
      </button>
    </div>
  );
};
