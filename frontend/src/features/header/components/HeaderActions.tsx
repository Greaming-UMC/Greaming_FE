import type { UserInfo } from "../config";
import { Button } from "../../../components/common/input";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../../libs/security/authStore";
import ProfileDropdown from "./dropdowns/ProfileDropdown";
import NotificationDropdown from "./dropdowns/NotificationDropdown";
import UploadDropdown from "./dropdowns/UploadDropdown";

interface HeaderActionsProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

export const HeaderActions = ({ userInfo, onLogout }: HeaderActionsProps) => {
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
  const isLoggedIn = isAuthenticated || !!userInfo?.nickname;

  if (!isLoggedIn) {
    return (
      <div className="ml-auto flex items-center gap-3 relative">
        <NavLink to="/login" className="inline-flex">
          <Button
            variant="secondary"
            size="sm"
            shape="round"
            className="font-medium shadow-none"
          >
            로그인
          </Button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center gap-3 relative">
      <ProfileDropdown userInfo={userInfo} onLogout={onLogout} />

      <NotificationDropdown />

      <UploadDropdown
        onUploadDaily={() => console.log("데일리챌린지 업로드")}
        onUploadWeekly={() => console.log("위클리챌린지 업로드")}
        onUploadGeneral={() => console.log("그림 업로드")}
        trigger={
          <Button
            variant="surface"
            size="sm"
            shape="round"
            className="font-medium text-on-surface shadow-none ml-1"
          >
            그림 업로드
          </Button>
        }
      />
    </div>
  );
};
