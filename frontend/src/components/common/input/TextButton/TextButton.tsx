import clsx from "clsx";
import type { TextButtonProps } from "./textButton.types";
const SIZE_STYLE: Record<
  TextButtonProps["size"],
  {
    textClass: string;
    padding: string;
    height: string;
  }
> = {
  xxxl: {
    textClass: "label-xxxlarge-emphasized",
    padding: "px-2 py-1",
    height: "h-[26px]",
  },
  xxl: {
    textClass: "label-xxlarge-emphasized",
    padding: "px-2 py-1",
    height: "h-[24px]",
  },
  xl: {
    textClass: "label-xlarge-emphasized",
    padding: "px-2 py-1",
    height: "h-[24px]",
  },
};

export const TextButton = ({
  children,
  size,
  icon,
  iconPosition = "none",
  disabled,
  onClick,
  className,
}: TextButtonProps) => {
  const sizeStyle = SIZE_STYLE[size];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1",
        sizeStyle.height,
        sizeStyle.padding,
        sizeStyle.textClass,
        "text-white",
        "select-none",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {icon && iconPosition === "left" && (
        <span className="w-6 h-6 flex items-center justify-center">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {icon && iconPosition === "right" && (
        <span className="w-6 h-6 flex items-center justify-center">
          {icon}
        </span>
      )}
    </button>
  );
};
