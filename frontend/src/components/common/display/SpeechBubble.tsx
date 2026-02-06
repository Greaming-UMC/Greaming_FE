import type { HTMLAttributes } from "react";

export type SpeechBubbleVariant = "solid";
export type SpeechBubbleSize = "sm";

export interface SpeechBubbleProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  variant?: SpeechBubbleVariant;
  size?: SpeechBubbleSize;
}

const VARIANT_CLASS: Record<SpeechBubbleVariant, string> = {
  solid: "bg-surface-variant-high text-on-surface",
};

const SIZE_CLASS: Record<SpeechBubbleSize, string> = {
  sm: "h-[28px] px-[8px] label-large",
};

const TAIL_SIZE: Record<SpeechBubbleSize, string> = {
  sm: "w-[12px] h-[12px]",
};

export const SpeechBubble = ({
  label,
  variant = "solid",
  size = "sm",
  className = "",
  ...props
}: SpeechBubbleProps) => {
  return (
    <div
      className={`
        relative inline-flex items-center rounded-full overflow-visible
        ${VARIANT_CLASS[variant]}
        ${SIZE_CLASS[size]}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{label}</span>
      <span
        className={`
          absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] pointer-events-none
          ${TAIL_SIZE[size]}
          ${VARIANT_CLASS[variant]}
        `}
      />
    </div>
  );
};
