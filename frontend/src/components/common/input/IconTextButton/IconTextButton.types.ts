// import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from "react";

// export type IconTextButtonTone = "neutral" | "accent";
// export type IconTextButtonSize = "lg" | "md" | "sm";

// export type IconTextButtonProps = {
//   label: string;
//   iconLeft: ReactNode;

//   size?: IconTextButtonSize;
//   tone?: IconTextButtonTone;

//   disabled?: boolean;

//   className?: string;
//   style?: CSSProperties;

//   type?: "button" | "submit" | "reset";
//   onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
//   "aria-label"?: string;
// } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "disabled">;
// src/components/common/input/IconTextButton/IconTextButton.types.ts
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconTextButtonSize = "sm" | "md" | "lg";

export interface IconTextButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** 아이콘 (svg?react로 import한 컴포넌트를 넣으면 currentColor로 색 동기화 가능) */
  icon: ReactNode;

  /** 텍스트 라벨 */
  label: ReactNode;

  /** 선택 상태(활성) - controlled */
  selected?: boolean;

  /** 크기 */
  size?: IconTextButtonSize;

  /** 비활성 색상 class (예: text-white, text-on-surface-variant-lowest) */
  inactiveClassName?: string;

  /** 활성 색상 class (예: text-schemes-secondary, text-on-surface) */
  activeClassName?: string;

  /** 아이콘-텍스트 간격 */
  gapClassName?: string;

  /** 아이콘 wrapper class (여기서 w/h 줄 수도 있음) */
  iconClassName?: string;

  /** 라벨 class */
  labelClassName?: string;
}
