import { forwardRef, type InputHTMLAttributes, type KeyboardEvent} from "react";
import clsx from "clsx";
import Icon, { type IconName } from "../../Icon";

export type SearchFieldSize = "medium" | "large";
export type SearchFieldIconPosition = "leading" | "trailing";

export interface SearchFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size"> {
  value: string;
  onChange: (value: string) => void;
  customSize?: SearchFieldSize;
  icon?: IconName;
  iconPosition?: SearchFieldIconPosition;
  onSearch?: () => void;
  className?: string;
  iconAriaLabel?: string;
  iconClassName?: string;
}

const SIZE_CLASS: Record<SearchFieldSize, string> = {
  medium: "h-[36px]",
  large: "h-[44px]",
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onChange,
      customSize = "medium",
      icon = "search",
      iconPosition = "trailing",
      onSearch,
      disabled,
      className,
      iconAriaLabel = "검색",
      iconClassName,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") onSearch?.();
    };

    const hasIcon = Boolean(icon);
    const iconElement = hasIcon ? (
      <Icon
    name={icon}
    size={24}
    className={clsx("fill-current stroke-current", iconClassName)}
    aria-hidden
  />
    ) : null;

    const iconButton = hasIcon ? (
      <button
        type="button"
        onClick={onSearch}
        disabled={disabled || !onSearch}
        aria-label={iconAriaLabel}
        className="shrink-0 inline-flex items-center justify-center"
      >
        {iconElement}
      </button>
    ) : null;

    return (
      <div
        className={clsx(
          "flex items-center gap-[8px] rounded-full px-[24px]",
          "bg-surface-variant-high text-on-surface-variant-lowest",
          SIZE_CLASS[customSize],
          disabled && "opacity-50",
          className,
        )}
      >
        {iconPosition === "leading" && iconButton}
        <input
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "text-on-surface placeholder:text-on-surface-variant-lowest",
          )}
          {...props}
        />
        {iconPosition === "trailing" && iconButton}
      </div>
    );
  },
);

SearchField.displayName = "SearchField";
