import { ListBase } from "../../input";
import type { UserInfo } from "../types";

interface ProfilePopupProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const ProfilePopup = ({ userInfo, onLogout }: ProfilePopupProps) => {
  const MENU_ITEMS = [
    { title: "프로필설정", onClick: () => console.log("프로필 설정") },
    { title: "계정", onClick: () => console.log("계정") },
    { title: "개인정보", onClick: () => console.log("개인정보") },
  ];

  const nickname = userInfo?.nickname ?? "임시 사용자";
  const levelText = userInfo?.level ? `Lv.${userInfo.level}` : undefined;

  return (
    <div className="w-[240px] bg-surface rounded-lg shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">
      <div className="px-4 pb-2 border-b border-surface-variant-low">
        <ListBase
          size="lg"
          title={nickname}
          subtitle={levelText ? { variant: "text", value: levelText } : undefined}
          avatar={{
            src: userInfo?.profileImgUrl,
            alt: nickname,
            size: "sm",
          }}
          className="pointer-events-none"
        />
      </div>

      {MENU_ITEMS.map((item) => (
        <ListBase
          key={item.title}
          size="md"
          title={item.title}
          className="text-on-surface cursor-pointer hover:bg-surface-variant-low"
          onClick={item.onClick}
        />
      ))}

      <div className="border-t border-surface-variant-low mt-2 pt-2">
        <ListBase
          size="md"
          title="로그아웃"
          className="text-on-surface cursor-pointer hover:bg-surface-variant-low"
          onClick={onLogout}
        />
      </div>
    </div>
  );
};

export default ProfilePopup;
