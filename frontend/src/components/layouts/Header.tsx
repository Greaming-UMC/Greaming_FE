import { useEffect, useState } from 'react';

import Logo from '../../assets/logo/mono-white-wordmark.svg?react';
import MyRoomIcon from '../../assets/icon/Header_MyRoom.svg?react';
import JourneyIcon from '../../assets/icon/header_journey.svg?react';
import CircleIcon from '../../assets/icon/Header_Circle.svg?react';
import BellIcon from '../../assets/icon/bell.svg?react';

const NAV_ITEMS = [
  { id: 'my-room', label: 'My Room', Icon: MyRoomIcon },
  { id: 'journey', label: 'Journey', Icon: JourneyIcon },
  { id: 'circle', label: 'Circle', Icon: CircleIcon },
] as const;

interface HeaderProps {
  mode?: 'onboarding' | 'main';
}

const Header = ({ mode = 'main' }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  // eslint-disable-next-line
  const [activeNav, setActiveNav] = useState('my-room');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 z-50 w-full border-b
        transition-all duration-300 ease-in-out
        bg-primary 
        border-outline
        ${isScrolled ? 'h-14' : 'h-20'} 
      `}
    >
      <div className="relative flex h-full items-center px-6">
        
        {/* [LEFT] 로고 영역 */}
        <div className="flex shrink-0 items-center gap-3 text-on-primary">
          <Logo
            className={`
              transition-all duration-300
              w-auto
              ${isScrolled ? 'h-[68px]' : 'h-[88px]'}
            `}
          />
        </div>

        {/* [CENTER] 네비게이션 */}
        {mode === 'main' && (
          <nav
            className={`
              absolute flex items-center transition-all duration-500 ease-in-out
              ${isScrolled ? 'left-[160px] translate-x-0' : 'left-1/2 -translate-x-1/2'}
              ${!isScrolled ? 'gap-3' : ''}
            `}
          >
            {NAV_ITEMS.map(({ id, label, Icon }, index) => {
              const isActive = activeNav === id;

              return (
                <div key={id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setActiveNav(id)}
                    className={`
                      flex items-center gap-1.5 transition-all duration-300 rounded-full
                      label-large
                      state-layer surface-variant-opacity-8
                      ${isScrolled && isActive ? 'text-secondary' : 'text-on-primary'}
                      ${!isScrolled 
                        ? 'border border-outline-variant' 
                        : 'border border-transparent'
                      }
                      ${isScrolled ? 'px-2 py-1' : 'px-3 py-1.5'}
                    `}
                  >
                    <Icon className="h-4 w-4 text-current" />
                    <span>{label}</span>
                  </button>

                  {/* 메뉴 사이 구분선 */}
                  <span 
                    className={`
                      mx-2 transition-opacity duration-300 text-outline-variant
                      ${isScrolled && index < NAV_ITEMS.length - 1 ? 'opacity-100' : 'opacity-0 hidden'}
                    `}
                  >
                    |
                  </span>
                </div>
              );
            })}
          </nav>
        )}

        {/* [RIGHT] : 프로필, 알림 bell */}
        {mode === 'main' && (
          <div className="ml-auto flex items-center gap-4 text-on-primary">
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
              <BellIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
