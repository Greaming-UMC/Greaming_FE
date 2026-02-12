import { ListBase } from "../../../../components/common/input";
import Icon, { type IconName } from "../../../../components/common/Icon";
import { NavLink } from "react-router-dom";
import type { UserInfo } from "../../config";

interface ProfilePopupProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const MENU_ITEMS = [
  { title: "프로필설정", to: "/setting?tab=profile" },
  { title: "계정", to: "/setting?tab=account" },
  { title: "개인정보", to: "/setting?tab=privacy" },
];

const ProfilePopup = ({ userInfo, onLogout }: ProfilePopupProps) => {
  const nickname = userInfo?.nickname ?? "임시 사용자";
  const usagePurposeIcon = userInfo?.level as IconName | undefined;

  return (
    <div className="w-[360px] bg-surface rounded-lg shadow-xl">
      <div className="border-b border-surface-variant-low px-4 py-2">
        <NavLink to="/profile/self" className="block">
          <ListBase
            size="lg"
            title={nickname}
            avatar={{
              src: userInfo?.profileImgUrl,
              alt: nickname,
              size: 48,
            }}
            trailing={
              usagePurposeIcon ? (
                <Icon
                  name={usagePurposeIcon}
                  size={24}
                  className="text-on-surface"
                  aria-label="사용 목적"
                />
              ) : null
            }
            titleClassName="main-title-small-emphasized text-on-surface"
          />
        </NavLink>
      </div>
      <div className="px-4 py-2">
        {MENU_ITEMS.map((item) => (
          <NavLink key={item.title} to={item.to} className="block">
            <ListBase
              size="md"
              title={item.title}
              className="text-on-surface rouned-medium"
            />
          </NavLink>
        ))}
      </div>

      <div className="border-t border-surface-variant-low px-4 py-2">
        <ListBase
          size="md"
          title="로그아웃"
          className="text-error rouned-medium"
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default ProfilePopup;
