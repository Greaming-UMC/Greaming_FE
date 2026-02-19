import { Button } from "../../../../components/common";
import type { SortBy } from "../../../../apis/types/common";

interface Props {
  value: SortBy;
  onChange: (value: SortBy) => void;
}

const SORT_LABEL: Record<SortBy, string> = {
  latest: "최신",
  popular: "인기",
  bookmarks: "북마크",
  recommend: "추천",
};

const OPTIONS: Array<SortBy> = ["latest", "popular", "recommend"];

const SortTabs = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {OPTIONS.map((key) => {
        const selected = value === key;

        return (
          <Button
            key={key}
            type="button"
            size="sm"
            shape="round"
            variant={selected ? "primary" : "outlined"}
            onClick={() => onChange(key)}
            className={selected ? "" : "bg-surface border-1"}
            textClassName="label-xlarge-emphasized"
          >
            {SORT_LABEL[key]}
          </Button>
        );
      })}
    </div>
  );
};

export default SortTabs;
