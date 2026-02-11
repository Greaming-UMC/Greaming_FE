import type { UserInfo } from "./types";
import { Avatar } from "../display";
import ProfilePopup from "./popups/ProfilePopups";
import Icon from "../Icon";
import NotificationPopup from "./popups/NotificationPopup";
import { Button } from "../input";
import { Dropdown } from "../feedback/Dropdown";

interface HeaderActionsProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
  onLogin?: () => void;
}

export const HeaderActions = ({ userInfo, onLogout, onLogin }: HeaderActionsProps) => {
  const isLoggedIn = !!userInfo?.nickname;

  if (!isLoggedIn) {
    return (
      <div className="ml-auto flex items-center gap-3 relative">
        <Button
          variant="secondary"
          size="sm"
          shape="square"
          className="font-medium shadow-none"
          onClick={onLogin ?? (() => console.log("로그인"))}
        >
          로그인
        </Button>
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-3 relative">
      <Dropdown
        align="right"
        trigger={
          <button
            type="button"
            className="block rounded-full hover:opacity-80 transition-opacity"
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

      <Button
        variant="surface"
        size="sm"
        shape="round"
        className="font-medium text-on-surface shadow-none ml-1"
        onClick={() => console.log("그림 업로드")}
      >
        그림 업로드
      </Button>
    </div>
  );
};
