import HeaderTabs from './HeaderTabs';
import { HeaderActions } from './HeaderActions';
import Logo from '../Logo';
import type { UserInfo } from './types';
import { HEADER_HEIGHT } from '../layouts/layout';
import { useHeaderScroll } from './hooks/useHeaderScroll';

interface HeaderMainProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const HeaderMain = ({ userInfo, onLogout }: HeaderMainProps) => {
  const { isScrolled, sentinelRef } = useHeaderScroll(0);

  const headerClass = `fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
    isScrolled
      ? 'bg-primary shadow-md'
      : 'bg-linear-to-b from-primary via-primary/60 to-transparent'
  }`;

  const logoWrapperClass = `shrink-0 transition-transform duration-500 ease-in-out origin-left ${
    isScrolled ? 'scale-90' : 'scale-100'
  }`;

  const tabsWrapperClass = `absolute transition-all duration-500 ease-in-out ${
    isScrolled 
      ? 'left-[130px] translate-x-0' 
      : 'left-1/2 -translate-x-1/2'
  }`;

  return (
    <>
      <div ref={sentinelRef} className="absolute top-[82px] h-px w-px pointer-events-none opacity-0" />
      
      <header
        className={headerClass}
        style={{ height: isScrolled ? HEADER_HEIGHT.DEFAULT : HEADER_HEIGHT.MAIN }}
      >
        <div className="relative mx-auto h-full max-w-[1760px] px-8">
          <div className="flex h-full items-center">
            <div className={`z-10 ${logoWrapperClass}`}>
              <Logo name="mono_white_wordmark" size={100} />
            </div>

            <div className={tabsWrapperClass}>
              <HeaderTabs isScrolled={isScrolled} />
            </div>

            <div className="ml-auto z-10">
              <HeaderActions userInfo={userInfo} onLogout={onLogout} />
            </div>
            
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMain;