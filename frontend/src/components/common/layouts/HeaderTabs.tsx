import { NavLink } from 'react-router-dom';
import { Button } from '../input';
import Icon, { type IconName } from '../Icon';

type NavItemType =
  | { type: 'link'; path: string; label: string; iconName: IconName }
  | { type: 'button'; action: string; label: string; iconName: IconName };

const NAV_ITEMS: NavItemType[] = [
  { type: 'link', path: '/my-room', label: 'My Room', iconName: 'nav_myroom' },
  { type: 'link', path: '/journey', label: 'Journey', iconName: 'nav_journy' },
  { type: 'button', action: 'open-circle', label: 'Circle', iconName: 'nav_circle' },
];

interface HeaderTabsProps {
  isScrolled: boolean;
  onCircleClick: () => void;
}

const HeaderTabs = ({ isScrolled, onCircleClick }: HeaderTabsProps) => {
  return (
    <nav
      className={`
        absolute flex items-center transition-all duration-500 ease-in-out
        ${isScrolled ? 'left-[100px] translate-x-0 gap-0' : 'left-1/2 -translate-x-1/2 gap-3'}
      `}
    >
      {NAV_ITEMS.map((item, index) => {
        const renderNotScrolled = (
          <Button
            variant="onPrimary"
            size="md"
            icon={item.iconName}
            shape="round"
            className="px-4 py-2 border border-on-primary"
            tabIndex={-1}
            onClick={item.type === 'button' ? onCircleClick : undefined}
          >
            {item.label}
          </Button>
        );

        const renderScrolled = (isActive: boolean) => (
          <div
            onClick={item.type === 'button' ? onCircleClick : undefined}
            className={`
              flex items-center gap-1.5 transition-all duration-300 rounded-full
              label-large state-layer px-2 py-1 bg-transparent cursor-pointer
              ${isActive ? 'text-secondary' : 'text-on-primary'}
            `}
          >
            <Icon name={item.iconName} size={16} className="text-current" />
            <span>{item.label}</span>
          </div>
        );

        return (
          <div key={item.label} className="flex items-center">
            {item.type === 'link' ? (
              <NavLink to={item.path}>
                {({ isActive }) =>
                  !isScrolled ? renderNotScrolled : renderScrolled(isActive)
                }
              </NavLink>
            ) : (
              !isScrolled ? renderNotScrolled : renderScrolled(false) 
            )}
            
            <span
              className={`
                mx-1 text-outline-variant transition-opacity duration-300
                ${isScrolled && index < NAV_ITEMS.length - 1 ? 'opacity-100' : 'hidden opacity-0'}
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