import type { ReactNode } from "react";
import { Dropdown } from "../../../../components/common/feedback/Dropdown";
import { ListBase } from "../../../../components/common/input";

interface CircleDropdownProps {
  trigger: ReactNode;
  onAddCircle?: () => void;
}

const CircleDropdown = ({ trigger, onAddCircle }: CircleDropdownProps) => {
  return (
    <Dropdown
      align="left"
      trigger={<button type="button">{trigger}</button>}
      menuClassName="mt-3"
    >
      <div className="w-[280px] bg-surface rounded-lg shadow-xl p-0 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <ListBase
          size="md"
          title="추가하기"
          leadingIcon="plus"
          radius="none"
          className="cursor-pointer text-on-surface h-[48px] flex items-center"
          onClick={onAddCircle}
        />
      </div>
    </Dropdown>
  );
};

export default CircleDropdown;