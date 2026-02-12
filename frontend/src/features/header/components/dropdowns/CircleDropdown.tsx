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
    >
      <div className="w-68 bg-surface rounded-lg shadow-xl p-2 animate-in fade-in zoom-in-95 duration-200">
        <ListBase
          size="md"
          title="추가하기"
          leadingIcon="add"
          radius="md"
          className="cursor-pointer text-on-surface"
          onClick={onAddCircle}
        />
      </div>
    </Dropdown>
  );
};

export default CircleDropdown;
