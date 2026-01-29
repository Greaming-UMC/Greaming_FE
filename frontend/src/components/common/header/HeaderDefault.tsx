import { HEADER_HEIGHT, Z_INDEX } from "../layouts/layout";
import Logo from "../Logo";
import { HeaderActions } from "./HeaderActions";
import HeaderTabs from "./HeaderTabs";
import type { UserInfo } from "./types";

interface HeaderDefaultProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const HeaderDefault = ({ userInfo, onLogout }: HeaderDefaultProps) => {
  return (
    <header
      className="fixed top-0 w-full bg-primary shadow-md transition-all"
      style={{ 
        height: HEADER_HEIGHT.DEFAULT,
        zIndex: Z_INDEX.HEADER 
      }}
    >
      <div className="relative h-full max-w-[1440px] mx-auto px-6">
        <div className="flex h-full items-center pt-1 gap-6">
          <Logo name="mono_white_wordmark" size={80} />
          <HeaderTabs isScrolled />
          <HeaderActions userInfo={userInfo} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default HeaderDefault;