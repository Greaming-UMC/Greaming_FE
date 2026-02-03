import { SegmentedButton } from "../../../components/common";

interface Props {
  value: "ALL" | "PERSONAL";
  onChange: (value: "ALL" | "PERSONAL") => void;
}

const HomeFilterTabs = ({ value, onChange }: Props) => {
  return (
    <SegmentedButton
      options={[
        { label: "All", value: "ALL" },
        { label: "내 취향 그림", value: "PERSONAL" },
      ]}
      value={value}
      onChange={(newVal) => onChange(newVal as "ALL" | "PERSONAL")}
      variant="primary"
      className="gap-1" 
      displayClassName="text-sm" 
    />
  );
};

export default HomeFilterTabs;