import { SegmentedButton } from "../../../../components/common";

interface Props {
  value: "ALL" | "PERSONAL";
  onChange: (value: "ALL" | "PERSONAL") => void;
}

const FilterTabs = ({ value, onChange }: Props) => {
  return (
    <SegmentedButton
      value={value}
      onChange={(val) => onChange(val as "ALL" | "PERSONAL")}
      options={[
        { value: "ALL", label: "All" },
        { value: "PERSONAL", label: "내 취향 그림" },
      ]}
      variant="primary"
      className="flex items-center gap-4"
      displayClassName="text-lg font-bold"
    />
  );
};

export default FilterTabs;
