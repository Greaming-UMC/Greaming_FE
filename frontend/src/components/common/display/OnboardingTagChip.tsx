import clsx from "clsx";
import { Chip } from "./Chip";

type Props = {
  label: string;                 // "#일러스트"
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function OnboardingTagChip({
  label,
  selected = false,
  disabled = false,
  onClick,
  className,
}: Props) {
  return (
    <Chip
      label={label}
      selected={false}
      variant="filled"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "!w-[104px] !h-[40px] !px-0 !rounded-[12px]",
        "!text-inherit label-large-emphasized",
        "shadow-[0_0_4px_rgba(18,19,21,0.20)]",
        selected
          ? "!bg-primary !text-secondary shadow-1"
          : "!bg-surface !text-on-surface shadow-1",
        disabled && "!opacity-50 !cursor-not-allowed",

        className,
      )}
    />
  );
}
