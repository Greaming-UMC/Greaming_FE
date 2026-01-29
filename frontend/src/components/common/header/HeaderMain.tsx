import { useEffect, useRef, useState } from 'react';
import HeaderTabs from './HeaderTabs';
import { HeaderActions } from './HeaderActions';
import Logo from '../Logo';
import type { UserInfo } from './types';

interface HeaderMainProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const HeaderMain = ({ userInfo, onLogout }: HeaderMainProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="absolute top-[82px] h-px w-px" />

      <header
        className={`
          fixed top-0 z-50 w-full
          transition-all duration-300 ease-in-out
          ${
            isScrolled
              ? 'h-[62px] bg-primary shadow-md'
              : 'h-[82px] bg-gradient-to-b from-primary via-primary/60 to-transparent backdrop-blur-[3.3px]'
          }
        `}
      >
        <div className="mx-auto h-full max-w-[1440px] px-6">
         <div className="flex h-full items-center">
          <div
            className={`
              transition-transform duration-300 ease-in-out
              ${isScrolled ? 'scale-80' : 'scale-100'}
            `}
          >
            <Logo name="mono_white_wordmark" size={100} />
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-0 flex items-center justify-center">
             <div
               className={`
               transition-transform duration-300 ease-in-out
               ${isScrolled ? '-translate-x-[390px]' : 'translate-x-0'}
               `}
              >
                <HeaderTabs isScrolled={isScrolled} />
              </div>
            </div>
          </div>
          <div className="ml-auto">
             <HeaderActions userInfo={userInfo} onLogout={onLogout} />
           </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMain;
