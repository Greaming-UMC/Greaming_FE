import Logo from "../Logo";
import { HeaderActions } from "./HeaderActions";
import HeaderTabs from "./HeaderTabs";

const HeaderDefault = () => {
  return (
    <header className="fixed top-0 z-50 w-full h-[62px] bg-primary shadow-md">
      <div className="relative h-full max-w-[1440px] mx-auto px-6">
        <div className="flex h-full items-center pt-1 gap-6">
          <Logo name="mono_white_wordmark" size={80} />
          <HeaderTabs isScrolled />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
};

export default HeaderDefault;
