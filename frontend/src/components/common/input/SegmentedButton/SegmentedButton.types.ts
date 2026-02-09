import type { ReactNode } from "react";

export type SegmentedButtonVariant = "primary" | "secondary";

export interface SegmentedOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedButtonProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: SegmentedButtonVariant;
  disabled?: boolean;
  className?: string;
  displayClassName?: string;
}
