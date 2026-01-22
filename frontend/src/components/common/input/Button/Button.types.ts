import type React from "react";

/** 기존 Thin에서 쓰던 variant들 */
export type ButtonVariant = "primary" | "secondary" | "surface";

/** surface의 톤(Thin에서 사용) */
export type SurfaceTone = "variantLow" | "default";

/** Thick에서 쓰는 color 프리셋 */
export type ThickColor = "blackGreen" | "gray" | "whiteBlack";

export type ButtonSizePreset =
  // ---- Square Thin ----
  | "thinLg"
  | "thinMd"
  | "thinSm"
  | "thinXs"
  | "thinXxs"
  | "thinIconMd"
  // ---- Square Thick ----
  | "thickXL"
  | "thickL"
  | "thickS"
  | "thickM";

export type ButtonContentPreset = "default" | "iconTextHug";

/** ✅ 아이콘 크기 프리셋 (디자인 규칙: 24/28/32) */
export type ButtonIconSize = 24 | 28 | 32;

export type ButtonProps = {
  /** Thin용 */
  variant?: ButtonVariant;
  surfaceTone?: SurfaceTone;
  bordered?: boolean;

  /** Thick용 (thick일 때만 의미 있음) */
  thickColor?: ThickColor;

  /** 공통 */
  sizePreset?: ButtonSizePreset;

  iconLeft?: React.ReactNode;

  /**  iconLeft가 있을 때 wrapper의 아이콘 박스 크기 */
  iconSize?: ButtonIconSize;

  contentPreset?: ButtonContentPreset;

  children?: React.ReactNode;

  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;

  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  "aria-label"?: string;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "disabled"
>;
