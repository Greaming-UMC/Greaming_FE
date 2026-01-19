import { TextAreaField } from "../common/input";

type Variant = "fixed300" | "hug350";

export interface CircleIntroFieldProps {
  value: string;
  onChange: (value: string) => void;
  variant: Variant;
}

export const CircleIntroField = ({
  value,
  onChange,
  variant,
}: CircleIntroFieldProps) => {
  if (variant === "fixed300") {
    return (
      <TextAreaField
        value={value}
        onChange={onChange}
        maxLength={300}
        placeholder="띄어쓰기 포함 300자 이내 작성해주세요."
        variant="fixed300"
      />
    );
  }

  return (
    <TextAreaField
      value={value}
      onChange={onChange}
      maxLength={350}
      placeholder="띄어쓰기 포함 350자 이하로 작성해주세요."
      variant="hug350"
    />
  );
};
