import HeaderTabs from "./HeaderTabs";
import { HeaderActions } from "./HeaderActions";
import Logo from "../Logo";
import type { UserInfo } from "./types";
import { useHeaderScroll } from "./hooks/useHeaderScroll";
import { NavLink, useLocation } from "react-router-dom";

interface HeaderMainProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const HeaderMain = ({ userInfo, onLogout }: HeaderMainProps) => {
  const location = useLocation();
  const { isScrolled: isHomeScrolled } = useHeaderScroll(920);
  const isHome = location.pathname === "/home";
  const isScrolled = isHome ? isHomeScrolled : true;

  const headerClass = `fixed top-0 z-50 w-full transition-all duration-300 ease ${
    isScrolled ? "h-16" : "h-24"
  } ${
    isScrolled ? "bg-primary/80 backdrop-blur-md shadow-md" : "bg-linear-to-b from-primary via-primary/60 to-transparent"
  }`;

  const logoWrapperClass = "shrink-0 duration-300 ease w-32";
  const logoSize = isScrolled ? "md" : "lg";

  const tabsAreaClass = "flex items-center";
  const tabsTrackClass = `relative transition-[left,transform] duration-600 ${
    isScrolled ? "left-0 translate-x-0 ease-out" : "left-1/2 -translate-x-1/2 ease-in-out"
  }`;

  return (
    <>
      <header className={headerClass}>
        <div className="relative mx-auto h-full px-20">
          <div className="grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6">

            <NavLink to="/home" aria-label="홈으로 이동" className="inline-flex">
              <Logo name="mono_white_wordmark" size={logoSize} className={logoWrapperClass} />
            </NavLink>

            <div className={tabsAreaClass}>
              <div className={tabsTrackClass}>
                <HeaderTabs isScrolled={isScrolled} />
              </div>
            </div>
            
            <HeaderActions userInfo={userInfo} onLogout={onLogout} />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMain;
