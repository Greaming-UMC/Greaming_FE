import type { HTMLAttributes } from "react";
import Icon from "../common/Icon";

/* -------------------------------------------------------------------------- */
/* 1. Types Definition                                                       */
/* -------------------------------------------------------------------------- */

type BadgeVariant =
  | "primary" // 브랜드 컬러
  | "secondary" // 보조
  | "neutral" // 기본 회색
  | "outline" // 테두리만
  | "error" // 에러 (빨강)
  | "success" // 성공 (초록)
  | "tag"; // [태그/해시태그] 스타일

type BadgeSize = "sm" | "md";

type IconPosition = "left" | "right";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: string;
  iconPosition?: IconPosition;
}

/* -------------------------------------------------------------------------- */
/* 2. Styles Mapping                                                          */
/* -------------------------------------------------------------------------- */

const variantStyles: Record<BadgeVariant, string> = {
  // [Tag]
  tag: "bg-surface-variant-lowest text-on-surface-variant-bright cursor-pointer border border-transparent rounded-extra-large",

  // [Primary]
  primary: "bg-primary text-on-primary border-transparent",

  // [Secondary]
  secondary: "bg-secondary text-on-secondary border-transparent",

  // [Neutral]
  neutral: "bg-surface-variant text-on-surface-variant border-transparent",

  // [Error]
  error: "bg-error-container text-on-error-container border-transparent",

  // [Success]
  success:
    "bg-green-100 text-green-800 border-transparent dark:bg-green-900 dark:text-green-100",

  // [Outline]
  outline:
    "bg-surface border border-[1px] border-solid border-outline text-on-surface-variant rounded-surface",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-6 px-2 text-xs gap-1", // 작은 사이즈
  md: "h-8 px-3 text-sm gap-1", // 기본 사이즈
};

const iconSizeMap: Record<BadgeSize, number> = {
  sm: 14,
  md: 18,
};

/* -------------------------------------------------------------------------- */
/* 3. Main Component                                                         */
/* -------------------------------------------------------------------------- */

export const Badge = ({
  label,
  variant = "neutral",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  ...props
}: BadgeProps) => {
  return (
    <span
      className={`
        /* 공통 레이아웃 */
        inline-flex items-center justify-center 
        
        font-medium leading-none pb-[1px] /* 텍스트 수직 중앙 정렬 보정 */
        
        /* 스타일 적용 */
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        
        ${className}
      `}
      {...props}
    >
      {/* 왼쪽 아이콘 */}
      {icon && iconPosition === "left" && (
        <Icon name={icon} size={iconSizeMap[size]} className="fill-current" />
      )}

      {/* 텍스트 */}
      <span>{label}</span>

      {/* 오른쪽 아이콘 */}
      {icon && iconPosition === "right" && (
        <Icon name={icon} size={iconSizeMap[size]} className="fill-current" />
      )}
    </span>
  );
};
