import type React from "react";

export type CheckboxProps = {
  /** controlled */
  checked: boolean;
  onChange: (checked: boolean) => void;

  /** label */
  label?: React.ReactNode;

  disabled?: boolean;
  error?: boolean;
  helperText?: string;

  /** 스타일 확장 */
  className?: string;
  style?: React.CSSProperties;

  /** 접근성: 라벨이 없고 아이콘만 쓰는 경우 대비 */
  "aria-label"?: string;
  id?: string;
  name?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "checked" | "onChange" | "type" | "disabled"
>;
