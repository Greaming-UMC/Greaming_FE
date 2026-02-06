import type { HTMLAttributes } from "react";
import Icon from "../Icon";
import type { IconName } from "../Icon";

export type CounterVariant = "label" | "icon" | "count";
export type CounterSize = "sm" | "md";

export interface CounterProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CounterVariant;
  size?: CounterSize;
  count: number;
  label?: string;
  icon?: IconName;
}

const SIZE_CLASS: Record<CounterSize, string> = {
  sm: "label-xlarge-emphasized gap-[2px]",
  md: "label-xlarge-emphasized gap-[4px]",
};

const ICON_SIZE: Record<CounterSize, number> = {
  sm: 18,
  md: 24,
};

export const Counter = ({
  variant = "label",
  size = "md",
  count,
  label,
  icon,
  className = "",
  ...props
}: CounterProps) => {
  const hasLabel = typeof label === "string" && label.length > 0;
  const hasIcon = !!icon;

  return (
    <div
      className={`
        inline-flex items-center text-on-surface
        ${SIZE_CLASS[size]}
        ${className}
      `}
      {...props}
    >
      {variant === "label" && hasLabel && <span>{label}</span>}
      {variant === "icon" && hasIcon && (
        <Icon name={icon} size={ICON_SIZE[size]} />
      )}
      <span>{count}</span>
    </div>
  );
};
