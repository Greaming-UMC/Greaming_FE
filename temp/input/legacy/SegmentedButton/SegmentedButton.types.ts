export type SegmentedButtonTone = "neutral" | "accent";

export interface SegmentedOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SegmentedButtonProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  tone?: SegmentedButtonTone;
  disabled?: boolean;
  className?: string;
}
