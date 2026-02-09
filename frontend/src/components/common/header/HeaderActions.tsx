import { useRef, useState } from "react";
import type { UserInfo } from "./types";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { Avatar } from "../display";
import ProfilePopup from "./popups/ProfilePopups";
import Icon from "../Icon";
import NotificationPopup from "./popups/NotificationPopup";
import { Button } from "../input";

interface HeaderActionsProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

type PopupType = 'notification' | 'profile';

export const HeaderActions = ({ userInfo, onLogout }: HeaderActionsProps) => {
  const [activePopup, setActivePopup] = useState<PopupType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setActivePopup(null));

  const togglePopup = (type: PopupType) => {
    setActivePopup((prev) => (prev === type ? null : type));
  };

  return (
    <div
      className="ml-auto flex items-center gap-3 relative"
      ref={containerRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => togglePopup('profile')}
          className="block rounded-full hover:opacity-80 transition-opacity"
        >
          <Avatar
            src={userInfo?.profileImgUrl}
            alt={userInfo?.nickname ?? 'User'}
            size="sm"
          />
        </button>

        {activePopup === 'profile' && (
          <ProfilePopup userInfo={userInfo} onLogout={onLogout} />
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => togglePopup('notification')}
          className="rounded-full p-1.5 hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          <Icon name="bell" size={24} className="text-on-primary" />
        </button>

        {activePopup === 'notification' && <NotificationPopup />}
      </div>

      <Button
        variant="surface"
        size="sm"
        shape="round"
        className="font-medium text-primary shadow-none ml-1"
        onClick={() => console.log('그림 업로드')}
      >
        그림 업로드
      </Button>
    </div>
  );
};