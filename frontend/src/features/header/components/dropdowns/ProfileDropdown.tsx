import { Dropdown } from "../../../../components/common/feedback/Dropdown";
import { Avatar } from "../../../../components/common/display";
import type { UserInfo } from "../../config";
import ProfilePopup from "../popups/ProfilePopups";

interface ProfileDropdownProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const ProfileDropdown = ({ userInfo, onLogout }: ProfileDropdownProps) => {
  return (
    <Dropdown
      align="right"
      trigger={
        <button
          type="button"
          className="block rounded-full statelayers primary-container-opacity-16"
        >
          <Avatar
            src={userInfo?.profileImgUrl}
            alt={userInfo?.nickname ?? "User"}
            size="sm"
          />
        </button>
      }
      menuClassName="mt-3"
    >
      <ProfilePopup userInfo={userInfo} onLogout={onLogout} />
    </Dropdown>
  );
};

export default ProfileDropdown;
