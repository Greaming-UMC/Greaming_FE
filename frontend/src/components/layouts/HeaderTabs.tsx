import MyRoomIcon from '../../assets/icon/Header_MyRoom.svg?react';
import JourneyIcon from '../../assets/icon/header_journey.svg?react';
import CircleIcon from '../../assets/icon/Header_Circle.svg?react';

const NAV_ITEMS = [
  { id: 'my-room', label: 'My Room', Icon: MyRoomIcon },
  { id: 'journey', label: 'Journey', Icon: JourneyIcon },
  { id: 'circle', label: 'Circle', Icon: CircleIcon },
] as const;

interface HeaderTabsProps {
  isScrolled: boolean;
  activeNav: string;
  onChange: (id: string) => void;
}

const HeaderTabs = ({ isScrolled, activeNav, onChange }: HeaderTabsProps) => {
  return (
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
              onClick={() => onChange(id)}
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
  );
};

export default HeaderTabs;
