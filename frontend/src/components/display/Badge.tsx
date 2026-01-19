import type { HTMLAttributes } from "react";
import Icon from "../common/Icon";
//사용예시
// <div className="flex gap-2">
//   <Badge label="New" variant="primary" size="sm" />
//   <Badge label="99+" variant="error" />
// </div>

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type BadgeVariant =
  | "neutral" // 회색 (기본)
  | "primary" // 브랜드
  | "error" // 에러/알림 (빨강)
  | "success" // 성공 (초록)
  | "warning"; // 경고 (노랑)

type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: string; // 상태 아이콘 (좌측 고정)
  /** * 점(Dot) 모드
   * - true일 경우 텍스트 없이 작은 점만 표시 (읽지 않은 알림 등)
   */
  dot?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const badgeStyles: Record<BadgeVariant, string> = {
  neutral: "bg-surface-variant text-on-surface-variant",
  primary: "bg-primary text-on-primary",
  error: "bg-error text-on-error",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: "h-5 text-[10px] px-1.5 rounded-full", // 아주 작은 뱃지
  md: "h-6 text-xs px-2 rounded-full", // 일반 뱃지
};

export const Badge = ({
  label,
  variant = "error",
  size = "md",
  icon,
  dot = false,
  className = "",
  ...props
}: BadgeProps) => {
  // Dot 모드일 때는 크기와 스타일이 완전히 달라짐
  if (dot) {
    return (
      <span
        className={`
          inline-block rounded-full ${badgeStyles[variant]}
          w-2.5 h-2.5 /* 점 크기 고정 */
          ${className}
        `}
        {...props}
      />
    );
  }

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-1
        font-bold leading-none
        whitespace-nowrap
        ${badgeStyles[variant]}
        ${badgeSizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && (
        <Icon
          name={icon}
          size={size === "sm" ? 10 : 12}
          className="fill-current"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
