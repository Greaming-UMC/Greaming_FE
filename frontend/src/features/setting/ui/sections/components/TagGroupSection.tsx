
import clsx from "clsx";
import { Button } from "../../../../../components/common";

interface Props {
  title: string;
  options: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
  max?: number;
}

export const TagGroupSection = ({ title, options, selected, onChange, max = 4 }: Props) => {
  const handleToggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else if (selected.length < max) {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <span className="label-large-emphasized text-on-surface">{title}</span>
        <span className="text-[11px] text-on-surface-variant-lowest">
          최소 1개 최대 {max}개 ({selected.length}/{max})
        </span>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-3">
        {options.map((tag) => {
          const isSelected = selected.includes(tag);
          return (
            <Button
              key={tag}
              variant={isSelected ? "primary" : "surface"}
              shape="square" size="sm" widthMode="fixed" width="110px"
              disabled={!isSelected && selected.length >= max}
              onClick={() => handleToggle(tag)}
              className={clsx("h-10 px-5 transition-all", !isSelected && "bg-surface text-on-surface shadow-1")}
            >
              {tag}
            </Button>
          );
        })}
      </div>
    </div>
  );
};