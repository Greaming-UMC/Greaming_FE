import { useEffect, useState } from 'react';

import Logo from '../../assets/logo/mono-white-wordmark.svg?react';
import BellIcon from '../../assets/icon/bell.svg?react';
import HeaderTabs from './HeaderTabs';

interface HeaderProps {
  mode?: 'onboarding' | 'main';
}

const Header = ({ mode = 'main' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('my-room');

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight - 100;
      setIsScrolled(window.scrollY > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 z-50 w-full 
        flex flex-col justify-center items-center
       transition-all duration-300 ease-in-out
        ${isScrolled ? 'h-[62px] bg-primary shadow-md' : 'h-[82px] bg-gradient-to-b from-primary via-primary/60 to-transparent backdrop-blur-[3.3px]'}
      `}
      
    >
      <div className="relative flex w-full items-center px-6">
        
        {/* [LEFT] 로고 영역 */}
        <div className="flex shrink-0 items-center gap-3 text-on-surface">
          <Logo
            className={`
              transition-all duration-300 w-auto
              ${isScrolled ? 'h-15' : 'h-20'} 
            `}
          />
        </div>

        {/* [CENTER] 네비게이션 */}
        {mode === 'main' && (
          <HeaderTabs
            isScrolled={isScrolled}
            activeNav={activeNav}
            onChange={setActiveNav}
          />
        )}

        {/* [RIGHT] : 프로필, 알림 bell */}
        {mode === 'main' && (
          <div className="ml-auto flex items-center gap-4 text-on-surface">
            <button
              type="button"
              onClick={() => {
                // TODO: 프로필 모달 오픈
              }}
              className="
                h-7 w-7 rounded-full
                bg-outline-variant
                overflow-hidden
                state-layer surface-variant-opacity-8"
            >
              {/* 나중에 API 연동 시 수정 필요 */}
            </button>
            <button
              type="button"
              className="rounded-full p-2 state-layer surface-variant-opacity-8"
            >
              <BellIcon className="h-5 w-5 text-on-primary" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;