import { Dropdown } from "../../../../components/common/feedback/Dropdown";
import Icon from "../../../../components/common/Icon";
import NotificationPopup from "../popups/NotificationPopup";

const NotificationDropdown = () => {
  return (
    <Dropdown
      align="right"
      trigger={
        <button
          type="button"
          className="rounded-full p-1.5 flex items-center justify-center"
        >
          <Icon name="bell" size={24} className="text-on-surface-variant-bright" />
        </button>
      }
      menuClassName="mt-3"
    >
      <NotificationPopup />
    </Dropdown>
  );
};

export default NotificationDropdown;
