import type { ReactNode } from "react";
import { Dropdown } from "../../../../components/common/feedback/Dropdown";
import { ListBase } from "../../../../components/common/input";

interface UploadDropdownProps {
  trigger: ReactNode;
  onUploadDaily?: () => void;
  onUploadWeekly?: () => void;
  onUploadGeneral?: () => void;
}

const itemClassName = "cursor-pointer text-on-surface";
const itemTitleClassName = "label-xlarge text-on-surface";

const UploadDropdown = ({
  trigger,
  onUploadDaily,
  onUploadWeekly,
  onUploadGeneral,
}: UploadDropdownProps) => {
  return (
    <Dropdown align="right" trigger={<button type="button">{trigger}</button>} menuClassName="mt-3">
      <div className="w-70 bg-surface rounded-lg shadow-xl p-2 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col gap-1">
          <ListBase
            size="md"
            title="그림 업로드하기"
            leadingIcon="upload_white"
            radius="md"
            className={itemClassName}
            titleClassName={itemTitleClassName}
            onClick={onUploadGeneral}
          />
          <ListBase
            size="md"
            title="데일리챌린지 업로드하기"
            leadingIcon="upload_primary"
            radius="md"
            className={itemClassName}
            titleClassName={itemTitleClassName}
            onClick={onUploadDaily}
          />
          <ListBase
            size="md"
            title="위클리챌린지 업로드하기"
            leadingIcon="upload_secondary"
            radius="md"
            className={itemClassName}
            titleClassName={itemTitleClassName}
            onClick={onUploadWeekly}
          />
        </div>
      </div>
    </Dropdown>
  );
};

export default UploadDropdown;
