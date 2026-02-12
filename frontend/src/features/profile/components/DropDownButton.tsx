import { useState } from "react";
import { Button, ListBase } from "../../../components/common/input";
import { Dropdown } from "../../../components/common/feedback";

interface DropDownsButtonProps {
  onEdit?: () => void | Promise<void>;
}

const DropdownButton = ({ onEdit }: DropDownsButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      align="right"
      menuClassName="bg-surface rounded-medium shadow-md p-[8px] w-50"
      trigger={
        <Button
          variant="text"
          size="none"
          shape="round"
          widthMode="fixed"
          width="40px"
          icon="dots"
          iconPosition="leading"
          aria-label="more actions"
        />
      }
    >
      <ListBase
        variant="modal"
        size="md"
        radius="sm"
        leadingIcon="edit"
        title="수정하기"
        widthMode="fill"
        onClick={() => {
          onEdit?.();
          setOpen(false);
        }}
      />
    </Dropdown>
  );
};

export default DropdownButton;


  
