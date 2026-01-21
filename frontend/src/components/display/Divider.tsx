// 사용 예시:
// <Divider orientation="vertical" thickness={3} className="mx-2" color="bg-primary" />
//<div className="w-10">
//      <Divider orientation="horizontal" thickness={2} className="my-4 h-4" />
//</div>

import type { HTMLAttributes } from "react";

type DividerOrientation = "horizontal" | "vertical";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 구분선 방향 (기본값: 'horizontal')
   * - horizontal: 가로선 (width: 100%)
   * - vertical: 세로선 (height: 100%, 보통 Flex 컨테이너 안에서 사용)
   */
  orientation?: DividerOrientation;

  /** * 구분선 두께 (기본값: 1px) */
  thickness?: number;

  /** * 구분선 색상 (Tailwind 클래스)
   * @default 'bg-outline-variant'
   */
  color?: string;
  className?: string;
}

export const Divider = ({
  orientation = "horizontal",
  thickness = 1,
  color = "bg-outline-variant",
  className = "",
  style,
  ...props // 나머지 div 속성들
}: DividerProps) => {
  // 1. 크기는 style로 (동적 계산)
  const sizeStyle =
    orientation === "horizontal"
      ? { width: "100%", height: thickness }
      : { height: "100%", width: thickness };

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      // 2. 색상(color)과 나머지 클래스(className)를 합침
      // border-0: hr 태그 속성 초기화용
      className={`border-0 shrink-0 ${color} ${className}`}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  );
};
