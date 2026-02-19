
import clsx from "clsx";
import { SelectItem } from "../../../../../components/common";
import Icon, { type IconName } from "../../../../../components/common/Icon";

interface Props {
  list: { title: string; desc: string; icon: string }[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
}

export const JourneySection = ({ list, selectedIdx, onSelect }: Props) => (
  <div className="flex flex-col gap-4">
    <h3 className="sub-title-large-emphasized text-on-surface">Journey 수정하기</h3>
    <div className="flex flex-col gap-2">
      {list.map((item, idx) => (
        <SelectItem
          key={idx}
          title={item.title}
          subtitle={{variant: "text", value: item.desc}}
          leading={<Icon name={item.icon as IconName} size={44} />}
          onClick={() => onSelect(idx)}
          selected={selectedIdx === idx}
          selectionStyle="solid"
          size="lg"
          className={clsx("cursor-pointer !rounded-large transition-all shadow-1")}
        />
      ))}
    </div>
  </div>
);