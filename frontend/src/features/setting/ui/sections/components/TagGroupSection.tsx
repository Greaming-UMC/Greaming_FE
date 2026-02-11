import clsx from "clsx";
import { Button } from "../../../../../components/common";

interface Props {
  title: string;
  options: string[]; 
  labelMap: Record<string, string>; 
  selected: string[]; 
  onChange: (tags: string[]) => void;
  max?: number;
}

export const TagGroupSection = ({ 
  title, 
  options, 
  labelMap, 
  selected, 
  onChange, 
  max = 4 
}: Props) => {
  
  const handleToggle = (tag: string) => {
    const isSelected = selected.includes(tag);
    
    if (isSelected) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      if (max === 1) {
        onChange([tag]);
      } else if (selected.length < max) {
        onChange([...selected, tag]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-1">
        <span className="label-large-emphasized text-on-surface">{title}</span>
        <span className="text-[11px] text-on-surface-variant-lowest">
          {max === 1 ? "1개 선택" : `최소 1개 최대 ${max}개 (${selected.length}/${max})`}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-x-2 gap-y-3">
        {options.map((key) => {
          const isSelected = selected.includes(key);
          const label = labelMap[key] || key;

          return (
            <Button
              key={key}
              variant={isSelected ? "primary" : "surface"}
              shape="square" 
              size="sm" 
              widthMode="fixed" 
              width="110px"
              disabled={max > 1 && !isSelected && selected.length >= max}
              onClick={() => handleToggle(key)}
              className={clsx(
                "h-10 px-5 transition-all !rounded-medium shadow-1", 
                !isSelected && "bg-surface text-on-surface"
              )}
            >
              #{label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};