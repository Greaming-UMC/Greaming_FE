import { SegmentedButton } from "../../../../components/common";
import type { CheckSubmissionType } from "../../../../apis/types/common";

interface Props {
  value: CheckSubmissionType;
  onChange: (value: CheckSubmissionType) => void;
}

const LABEL: Record<CheckSubmissionType, string> = {
  ALL: "All",
  PERSONAL: "내 취향 그림",
};

const FilterTabs = ({ value, onChange }: Props) => {
  const options = (["ALL", "PERSONAL"] as const).map((v) => {
    const selected = value === v;

    return {
      value: v,
      label: (
        <span className={selected ? "text-on-surface" : "text-on-surface-low"}>
          {LABEL[v]}
        </span>
      ),
    };
  });

  return (
    <SegmentedButton
      value={value}
      onChange={(val) => onChange(val as CheckSubmissionType)}
      options={options}
      variant="primary"
      className="gap-0"
      displayClassName="main-title-small-emphasized"
    />
  );
};

export default FilterTabs;
