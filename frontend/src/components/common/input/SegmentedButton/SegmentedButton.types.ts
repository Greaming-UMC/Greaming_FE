import type { ReactNode } from "react";

export type SegmentedButtonStyle = "primary" | "secondary";

export interface SegmentedOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SegmentedButtonProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  style?: SegmentedButtonStyle;
  disabled?: boolean;
  className?: string;
  displayClassName?: string;
}
