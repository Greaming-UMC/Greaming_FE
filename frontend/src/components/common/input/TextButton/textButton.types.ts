import type { ReactNode } from "react";

export type TextButtonSize = "xxxl" | "xxl" | "xl";

export type TextButtonIconPosition = "left" | "right" | "none";

export interface TextButtonProps {
  children: string;

  /** Hug 사이즈 기준 */
  size: TextButtonSize;

  /** 아이콘 */
  icon?: ReactNode;
  iconPosition?: TextButtonIconPosition;

  disabled?: boolean;
  onClick?: () => void;

  className?: string;
}
