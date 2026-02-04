import { SegmentedButton } from "../../../components/common";

type TabButtonProps = {
  value: "ALL" | "SAVED";
  onChange: (value: "ALL" | "SAVED") => void;
  className?: string;
};

const TabButtons = ({ value, onChange, className }: TabButtonProps) => {
  return (
    <div className={`flex ${className ?? ""}`}>
      <SegmentedButton
        value={value}
        onChange={(next) => onChange(next as "ALL" | "SAVED")}
        options={[
          { label: "내 그림", value: "ALL" },
          { label: "저장한 그림", value: "SAVED" },
        ]}
        variant="primary"
      />
    </div>
  );
};

export default TabButtons;
