import React, { useId } from "react";
import clsx from "clsx";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  checked,
  onChange,
  label = "text",
  disabled,
  error,
  helperText,
  className,
  style,
  id,
  ...rest
}: CheckboxProps) => {
  const autoId = useId();
  const inputId = id ?? autoId;

  const borderClass = error
    ? "border-[var(--color-error)]"
    : "border-[var(--color-outline)]";

  return (
    <div className={clsx("inline-flex flex-col gap-1", className)} style={style}>
      <label
        htmlFor={inputId}
        className={clsx(
          "inline-flex items-center gap-3",
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
        )}
      >
        <input
          {...rest}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />

        {/* checkbox box */}
        <span
          aria-hidden
          className={clsx(
            "w-6 h-6 rounded-[6px]",              // 첨부 이미지처럼 약간 둥근 사각
            "inline-flex items-center justify-center",
            "bg-[var(--color-surface)]",          // ✅ 항상 흰 배경
            "border-2",                           // ✅ 두꺼운 테두리 느낌
            borderClass,
            "state-layer primary-opacity-8"       // hover 오버레이 (원하면 제거 가능)
          )}
        >
          {checked ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="var(--color-outline)"     // ✅ 체크도 검정(토큰)
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : null}
        </span>

        {/* label */}
        {label ? (
          <span className="label-xxlarge-emphasized text-[var(--color-on-surface)]">
            {label}
          </span>
        ) : null}
      </label>

      {helperText ? (
        <p
          className={clsx(
            "body-small",
            error ? "text-[var(--color-error)]" : "text-[var(--color-on-surface-variant-low)]"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
