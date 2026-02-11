import { Children, forwardRef, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Icon, { type IconName } from "../../Icon";
import {
  BUTTON_SIZE_TOKENS,
  type ButtonShape,
  type ButtonSize,
  getButtonRadiusClass,
} from "./button.tokens";

export type ButtonVariant =
  | "primary"
  | "onPrimary"
  | "secondary"
  | "outlined"
  | "outlinedVariant"
  | "surface"
  | "surfaceVariant"
  | "text"
  | "textOnPrimary"
  | "textSecondary"
  | "nav";

export type IconPosition = "leading" | "trailing" | "none";
export type ButtonWidthMode = "hug" | "fixed" | "fill";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  icon?: IconName;
  iconPosition?: IconPosition;
  iconSize?: number;
  widthMode?: ButtonWidthMode;
  width?: number | string;
  textClassName?: string;
}

const VARIANT_STYLES: Record<
  ButtonVariant,
  { base: string; stateLayer: string }
> = {
  primary: {
    base: "bg-primary text-secondary",
    stateLayer: "surface-variant-opacity-16",
  },
  onPrimary: {
    base: "bg-primary text-on-primary",
    stateLayer: "surface-variant-opacity-16",
  },
  secondary: {
    base: "bg-secondary text-on-secondary",
    stateLayer: "secondary-opacity-8",
  },
  outlined: {
    base: "bg-transparent border border-outline text-on-surface",
    stateLayer: "surface-container-opacity-8",
  },
  outlinedVariant: {
    base: "bg-transparent border border-outline-variant text-on-surface",
    stateLayer: "surface-container-opacity-8",
  },
  surface: {
    base: "bg-surface text-on-surface",
    stateLayer: "surface-container-opacity-8",
  },
  surfaceVariant: {
    base: "bg-surface-variant-low text-on-surface-variant-dim",
    stateLayer: "surface-container-opacity-8",
  },
  text: {
    base: "bg-transparent text-on-surface",
    stateLayer: "surface-container-opacity-16",
  },
  textOnPrimary: {
    base: "bg-transparent text-on-primary",
    stateLayer: "surface-container-opacity-16",
  },
  textSecondary: {
    base: "bg-transparent text-secondary",
    stateLayer: "surface-container-opacity-16",
  },
  nav: {
    base: "bg-primary border border-on-primary text-on-primary",
    stateLayer: "surface-container-opacity-8",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "square",
      icon,
      iconPosition = "leading",
      iconSize = 24,
      children,
      widthMode = "hug",
      width,
      textClassName,
      className,
      disabled,
      type = "button",
      style,
      ...props
    },
    ref,
  ) => {
  const token = BUTTON_SIZE_TOKENS[size];
  const radiusClass = getButtonRadiusClass(size, shape);
  const hasIcon = !!icon && iconPosition !== "none";
  const hasContent = Children.count(children) > 0;
  const isIconOnly = hasIcon && !hasContent;
  const variantStyle = VARIANT_STYLES[variant];
  const textClass = textClassName ?? token.textClass;
  const mergedStyle =
    widthMode === "fixed" && width ? { ...style, width } : style;
  const ariaLabel = props["aria-label"];

  if (import.meta.env.DEV && isIconOnly && !ariaLabel) {
    console.warn("[Button] icon-only는 aria-label이 필요합니다.");
  }
  if (import.meta.env.DEV && widthMode === "fixed" && !width) {
    console.warn("[Button] widthMode가 fixed이면 width가 필요합니다.");
  }

  const iconElement = hasIcon ? (
    <Icon
      name={icon as IconName}
      size={iconSize}
      className="fill-current stroke-current"
      aria-hidden
    />
  ) : null;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={clsx(
        "inline-flex items-center justify-center",
        "cursor-pointer", //cursor-pointer 추가
        "state-layer transition-colors duration-150",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        token.paddingXClass,
        token.heightClass,
        textClass,
        radiusClass,
        widthMode === "fill" && "w-full",
        hasIcon && hasContent ? "gap-2" : "gap-0",
        variantStyle.base,
        variantStyle.stateLayer,
        className,
        )}
        style={mergedStyle}
        {...props}
      >
        {iconPosition === "leading" && iconElement}
        {hasContent && <span className="whitespace-nowrap">{children}</span>}
        {iconPosition === "trailing" && iconElement}
      </button>
    );
  },
);

Button.displayName = "Button";
