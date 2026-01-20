// src/components/common/input/Button/Button.tsx
import React from "react";
import clsx from "clsx";
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSizePreset,
  SurfaceTone,
  ThickColor,
} from "./Button.types";

type SizeSpec = {
  width: number;
  height: number;
  radius: number;
  paddingX: number;
  gap: number;
};

const SIZE_MAP: Record<ButtonSizePreset, SizeSpec> = {
  // ---- Thin ----
  thinLg: { width: 666, height: 60, radius: 8, paddingX: 8, gap: 10 },
  thinMd: { width: 572, height: 60, radius: 8, paddingX: 8, gap: 10 },
  thinSm: { width: 170, height: 40, radius: 8, paddingX: 8, gap: 10 },
  thinXs: { width: 140, height: 30, radius: 8, paddingX: 8, gap: 10 },
  thinXxs: { width: 137, height: 26, radius: 8, paddingX: 8, gap: 10 },
  thinIconMd: { width: 220, height: 40, radius: 8, paddingX: 8, gap: 10 },

  // ---- Thick ---- (padding 0, radius 12, gap 10)
  thickXL: { width: 990, height: 52, radius: 12, paddingX: 0, gap: 10 },
  thickL: { width: 134, height: 40, radius: 12, paddingX: 0, gap: 10 },
  thickS: { width: 104, height: 40, radius: 12, paddingX: 0, gap: 10 },
  thickM: { width: 82, height: 60, radius: 12, paddingX: 0, gap: 10 },
};

const TEXT_CLASS_BY_SIZE: Record<ButtonSizePreset, string> = {
  thinLg: "label-xxxlarge-emphasized",
  thinMd: "label-xxxlarge-emphasized",
  thinSm: "label-xxlarge-emphasized",
  thinXs: "label-large-emphasized",
  thinXxs: "label-medium-emphasized",
  thinIconMd: "label-xxlarge-emphasized",

  thickXL: "label-xxxlarge-emphasized",
  thickL: "label-xxlarge-emphasized",
  thickS: "label-xxlarge-emphasized",
  thickM: "label-xxxlarge-emphasized",
};

function isThick(sizePreset: ButtonSizePreset) {
  return sizePreset.startsWith("thick");
}

/** Thin용 스타일 */
function getThinClass(
  variant: ButtonVariant,
  surfaceTone: SurfaceTone,
  bordered?: boolean
) {
  if (variant === "primary") {
    return clsx(
      "bg-[var(--color-primary)]",
      "text-[var(--color-secondary)]",
      "state-layer primary-opacity-8"
    );
  }

  if (variant === "secondary") {
    return clsx(
      "bg-[var(--color-secondary)]",
      "text-[var(--color-on-secondary)]",
      "state-layer secondary-opacity-8"
    );
  }

  // surface
  const isVariantLow = surfaceTone === "variantLow";
  return clsx(
    isVariantLow
      ? "bg-[var(--color-surface-variant-low)]"
      : "bg-[var(--color-surface)]",
    isVariantLow
      ? "text-[var(--color-on-surface-variant-low)]"
      : "text-[var(--color-primary)]",
    bordered ? "border border-[var(--color-outline)]" : "border border-transparent",
    // variantLow는 surface-variant 오버레이가 자연스럽고, default는 container 오버레이가 무난
    isVariantLow
      ? "state-layer surface-variant-opacity-8"
      : "state-layer surface-container-opacity-8"
  );
}

/** Thick용 스타일 (요구사항 1~8 반영) */
function getThickClass(thickColor: ThickColor, sizePreset: ButtonSizePreset) {
  switch (thickColor) {
    case "blackGreen":
      return clsx(
        "bg-[var(--color-primary)]",
        "text-[var(--color-secondary)]",
        "state-layer primary-opacity-8"
      );

    case "whiteBlack":
      return clsx(
        "bg-[var(--color-surface)]",
        "text-[var(--color-on-surface)]",
        "state-layer surface-container-opacity-8"
      );

    case "gray":
      // 8번(thickM=82x60)은 Fill이 On-Surface-Variant-Low, 텍스트가 On-Surface-Variant-Lowest
      if (sizePreset === "thickM") {
        return clsx(
          "bg-[var(--color-on-surface-variant-low)]",
          "text-[var(--color-on-surface-variant-lowest)]",
          "state-layer surface-variant-opacity-8"
        );
      }
      //  2번(XLarge gray)는 Fill Surface-Variant-low, Text On-Surface
      return clsx(
        "bg-[var(--color-surface-variant-low)]",
        "text-[var(--color-on-surface)]",
        "state-layer surface-variant-opacity-8"
      );
  }
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    // defaults (Thin 기준)
    variant = "surface",
    surfaceTone = "default",
    bordered,
    thickColor = "blackGreen",

    sizePreset = "thinLg",

    iconLeft,
    iconSize = 24,
    contentPreset = "default",

    children,
    disabled,

    className,
    style,

    type = "button",
    onClick,
    ...rest
  },
  ref
) {
  const size = SIZE_MAP[sizePreset];

  const iconOnly = !children && !!iconLeft;
  if (iconOnly && !rest["aria-label"]) {
    console.warn("[Button] 아이콘-only 버튼은 aria-label이 필요합니다.");
  }

  const isHug = contentPreset === "iconTextHug";

  const colorClass = isThick(sizePreset)
    ? getThickClass(thickColor, sizePreset)
    : getThinClass(variant, surfaceTone, bordered);

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        "inline-flex items-center justify-center select-none",
        `gap-[${size.gap}px]`,
        size.paddingX === 0 ? "px-0" : "px-[8px]",
        colorClass,
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
      style={{
        width: size.width,
        height: size.height,
        borderRadius: size.radius,
        ...style,
      }}
    >
      {iconLeft ? (
        <span
          className="inline-flex shrink-0 items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
        >
          {iconLeft}
        </span>
      ) : null}

      {children ? (
        <span
          className={clsx(
            TEXT_CLASS_BY_SIZE[sizePreset],
            "inline-flex items-center justify-center"
          )}
          style={isHug ? { width: 155, height: 20 } : undefined}
        >
          {children}
        </span>
      ) : null}
    </button>
  );
});
