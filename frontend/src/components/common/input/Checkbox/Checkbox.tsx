import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import Icon from "../../Icon";

export type CheckboxVariant = "primary";

const VARIANT_STYLES: Record<
  CheckboxVariant,
  { base: string; stateLayer: string }
> = {
  primary: {
    base: "text-on-surface",
    stateLayer: "surface-container-opacity-8",
  },
};

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "onChange"
  > {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  variant?: CheckboxVariant;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      onChange,
      children,
      variant = "primary",
      disabled,
      className,
      style,
      id,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const variantStyle = VARIANT_STYLES[variant];

    return (
      <label
        htmlFor={inputId}
        className={clsx(
          "inline-flex items-center gap-[8px] px-[16px] py-[4px]",
          "rounded-small state-layer transition-colors duration-150",
          variantStyle.base,
          variantStyle.stateLayer,
          disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
          className,
        )}
        style={style}
      >
        <input
          {...rest}
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange(event.currentTarget.checked)}
          className="sr-only"
        />

        <Icon name={checked ? "check_box" : "check_box_outline_blank"} size={24} className="fill-current"/>
        {children ? <span className="label-xlarge">{children}</span> : null}
        
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
