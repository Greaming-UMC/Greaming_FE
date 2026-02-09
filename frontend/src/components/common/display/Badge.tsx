import type { HTMLAttributes } from "react";
import Icon from "../Icon";
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
  imgSrc?: string; // 이미지 소스 (아이콘 대신 커스텀 이미지),
  alt?: string; // 이미지 대체 텍스트 (imgSrc가 있을 때 필수)
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
  imgSrc,
  alt = "badge image",
  dot = false,
  className = "",
  ...props
}: BadgeProps) => {
  const hasLabel =
    label !== undefined &&
    label !== null &&
    !(typeof label === "string" && label.length === 0);
  const hasIcon = !!icon;

  // -------------------------------------------------------
  // 이미지 모드: 있는 그대로 보여주기
  // -------------------------------------------------------
  if (imgSrc) {
    // 사이즈만 잡아줍니다.
    const imgSizeClasses = size === "sm" ? "w-5 h-5" : "w-6 h-6";

    return (
      // span은 그냥 이미지를 감싸는 투명한 박스 역할만 합니다.
      <span
        className={`
          inline-block relative shrink-0 /* 찌그러짐 방지 */
          ${imgSizeClasses} 
          ${className}
        `}
        {...props}
      >
        <img
          src={imgSrc}
          alt={alt}
          // object-contain을 써서 이미지가 잘리지 않고 비율 유지하며 다 보이게 합니다.
          className="w-full h-full object-contain"
        />
      </span>
    );
  }

  // 아이콘/라벨 모두 없으면 렌더하지 않음
  if (!dot && !hasLabel && !hasIcon) {
    return null;
  }

  // 아이콘-only 모드 (라벨 없이 아이콘만)
  if (!dot && hasIcon && !hasLabel) {
    const iconOnlySizeClasses = size === "sm" ? "w-5 h-5" : "w-6 h-6";

    return (
      <span
        className={`
          inline-flex items-center justify-center shrink-0
          ${iconOnlySizeClasses}
          ${className}
        `}
        {...props}
      >
        <Icon name={icon} size="100%" className="fill-current" />
      </span>
    );
  }

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
      {hasLabel && <span>{label}</span>}
    </span>
  );
};
