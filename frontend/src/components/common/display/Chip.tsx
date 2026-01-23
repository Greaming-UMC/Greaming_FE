import type { ButtonHTMLAttributes } from "react";
import Icon from "../Icon";

// 1. 입력형 (삭제 가능) - 예: 태그 입력기
// <Chip
//   label="React"
//   onDelete={() => console.log("delete react")}
//   onClick={() => console.log("click 됨")}
// />
// // 2. 선택형 (Toggle) - 예: 카테고리 필터
// <Chip
//   label="디자인"
//   variant="filter"
//   onClick={() => console.log("toggle design")}
//   icon="brush" // 좌측 아이콘
// />
// // 3. 아웃라인형
// <Chip
//   label="#일상"
//   variant="outlined"
//   onClick={() => console.log("clicked daily tag")}
// />

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type ChipVariant =
  | "filled" // 배경색 있음 (기본)
  | "outlined" // 테두리만 있음 (필터 해제 상태 등)
  | "filter"; // 선택 토글용

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: ChipVariant;
  /** 선택된 상태 (Filter/Choice 칩에서 사용) */
  selected?: boolean;
  /** 좌측 아이콘 (프로필, 카테고리 아이콘 등) */
  icon?: string;
  /** * 삭제 함수가 전달되면 우측에 'X' 버튼이 생깁니다. (Input Chip)
   */
  onDelete?: () => void;
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export const Chip = ({
  label,
  variant = "filled",
  selected = false,
  icon,
  onDelete,
  className = "",
  onClick,
  disabled,
  ...props
}: ChipProps) => {
  // GDS 토큰 기반 스타일 매핑
  const getVariantClasses = () => {
    // 1. 선택된 상태 (가장 우선순위 높음)
    if (selected) {
      return "bg-secondary-container text-on-secondary-container border-transparent";
    }

    // 2. Disabled 상태
    if (disabled) {
      return "bg-surface-variant-lowest text-on-surface-variant-low cursor-not-allowed opacity-50";
    }

    // 3. 일반 상태
    switch (variant) {
      case "outlined":
        return "bg-transparent border border-outline text-on-surface hover:bg-surface-variant-lowest";
      case "filled":
      default:
        return "bg-surface-variant-lowest text-on-surface-variant-bright border border-transparent";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        /* 공통 레이아웃 */
        inline-flex items-center justify-center gap-1.5
        h-8 px-3 rounded-extra-large /* 칩은 보통 뱃지보다 큼 (터치 영역 고려) */
        text-sm font-medium
        transition-colors duration-200
        cursor-pointer
        
        /* 스타일 주입 */
        ${getVariantClasses()}
        
        /* 커스텀 클래스 */
        ${className}
      `}
      {...props}
    >
      {/* 1. 좌측 아이콘 (있을 때만) */}
      {icon && (
        <Icon name={icon} size={18} className="fill-current opacity-80" />
      )}

      {/* 2. 라벨 */}
      <span>{label}</span>

      {/* 3. 삭제 버튼 (onDelete가 있을 때만) */}
      {onDelete && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation(); // 칩 클릭 이벤트 버블링 방지
            onDelete();
          }}
          className="ml-0.5 flex items-center justify-center rounded-full hover:bg-black/10 p-0.5 transition-colors"
        >
          <Icon name="close" size={14} className="fill-current" />
        </span>
      )}
    </button>
  );
};
