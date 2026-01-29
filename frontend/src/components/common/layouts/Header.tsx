import { useEffect, useState } from 'react';
import HeaderTabs from './HeaderTabs';

import Logo from '../../../assets/logo/mono-white-wordmark.svg?react';
import Bell from '../../../assets/icon/mono/bell.svg?react';
import Profile from '../../../assets/icon/multi/char_profile_red.svg?react';

interface HeaderProps {
  mode?: 'onboarding' | 'main';
  variant?: 'home' | 'default';
}

const Header = ({ mode = 'main', variant = 'default' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (variant !== 'home') return;

    const handleScroll = () => {
      const triggerPoint = window.innerHeight - 100;
      setIsScrolled(window.scrollY > triggerPoint);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  return (
    <header
      className={`
        fixed top-0 z-50 w-full 
        flex flex-col justify-center items-center
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'h-[62px] bg-primary shadow-md' : 'h-[82px] bg-linear-to-b from-primary via-primary/70 to-transparent'}
      `}
    >
      <div className="relative flex w-full items-center px-6">
        
        {/* 왼쪽 : 로고 영역*/}
          <Logo
            className={`
              transition-all duration-300 w-auto
              ${isScrolled ? 'h-15' : 'h-20'} 
            `}
          />

        {/* 중앙 : 네비게이션*/}
        {mode === 'main' && (
          <HeaderTabs isScrolled={isScrolled} />
        )}

        {/* 오른쪽 : 프로필, 알림 bell */}
        {mode === 'main' && (
          <div className="ml-auto flex items-center gap-4 text-on-surface">
            <button
              type="button"
              className="
                rounded-full
                overflow-hidden
                state-layer surface-variant-opacity-8"
            >
              <Profile className="h-7 w-7 text-on-primary" />
              {/* 나중에 API 연동 시 수정 필요 */}
            </button>
            <button
              type="button"
              className="rounded-full p-2 state-layer surface-variant-opacity-8"
            >
              <Bell className="h-7 w-7 text-on-primary" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;