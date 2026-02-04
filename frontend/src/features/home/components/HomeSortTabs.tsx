import { Button } from "../../../components/common";

interface Props {
  value: "LATEST" | "POPULAR" | "RECOMMEND";
  onChange: (value: "LATEST" | "POPULAR" | "RECOMMEND") => void;
}

const SORT_LABEL: Record<Props["value"], string> = {
  LATEST: "최신",
  POPULAR: "인기",
  RECOMMEND: "추천",
};

const HomeSortTabs = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {(Object.keys(SORT_LABEL) as Props["value"][]).map((key) => {
        const isSelected = value === key;

        return (
          <Button
            key={key}
            type="button"
            size="sm"
            shape="round"
            variant={isSelected ? "primary" : "outlined"}
            onClick={() => onChange(key)}
          >
            {SORT_LABEL[key]}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeSortTabs;
