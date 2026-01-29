import { useState, useRef } from 'react';
import Icon from '../Icon';
import type { UserInfo } from './types';
import NotificationPopup from './popups/NotificationPopup';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import ProfilePopup from './popups/ProfilePopups';
interface HeaderActionsProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

export const HeaderActions = ({ userInfo, onLogout }: HeaderActionsProps) => {
  const [activePopup, setActivePopup] =
    useState<'notification' | 'profile' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => setActivePopup(null));

  const togglePopup = (type: 'notification' | 'profile') => {
    setActivePopup(prev => (prev === type ? null : type));
  };

  return (
    <div
      className="ml-auto flex items-center gap-4 relative"
      ref={containerRef}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => togglePopup('profile')}
          className="rounded-full w-9 h-9 overflow-hidden"
        >
          {userInfo?.profileImgUrl ? (
            <img
              src={userInfo.profileImgUrl}
              alt={userInfo.nickname}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="char_profile_red" size={28} />
          )}
        </button>

        {activePopup === 'profile' && (
          <ProfilePopup
            userInfo={userInfo}
            onLogout={onLogout}
          />
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => togglePopup('notification')}
          className="rounded-full p-2"
        >
          <Icon name="bell" size={28} className="text-on-primary" />
        </button>

        {activePopup === 'notification' && <NotificationPopup />}
      </div>
    </div>
  );
};
