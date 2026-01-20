// src/components/common/input/IconTextButton/IconTextButton.tsx
import React from "react";
import clsx from "clsx";
import type { IconTextButtonProps, IconTextButtonSize } from "./IconTextButton.types";

const SIZE_STYLE: Record<IconTextButtonSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-9 px-2.5 text-base",
  lg: "h-10 px-3 text-lg",
};

export default function IconTextButton({
  icon,
  label,
  selected = false,
  size = "md",

  inactiveClassName = "text-white",
  activeClassName = "text-schemes-secondary",

  gapClassName = "gap-2",
  iconClassName = "shrink-0 w-[18px] h-[18px] flex items-center justify-center",
  labelClassName = "leading-none",

  className,
  disabled,
  type = "button",
  ...props
}: IconTextButtonProps) {
  //  선택 상태에 따라 버튼의 "text color"를 바꿈 -> svg가 currentColor면 아이콘도 같이 바뀜
  const toneClass = selected ? activeClassName : inactiveClassName;

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center select-none rounded-md",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        SIZE_STYLE[size],
        gapClassName,
        toneClass,
        className
      )}
      {...props}
    >
      <span className={iconClassName}>{icon}</span>
      <span className={labelClassName}>{label}</span>
    </button>
  );
}
