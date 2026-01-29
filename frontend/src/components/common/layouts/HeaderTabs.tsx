import { NavLink } from 'react-router-dom';
import type { IconName } from '../Icon';
import { Button } from '../input';
import Icon from '../Icon';

const NAV_ITEMS: { path: string; label: string; iconName: IconName }[] = [
  { path: '/my-room', label: 'My Room', iconName: 'nav_myroom' },
  { path: '/journey', label: 'Journey', iconName: 'nav_journy' },
  { path: '/circle', label: 'Circle', iconName: 'nav_circle' },
];

interface HeaderTabsProps {
  isScrolled: boolean;
}

const HeaderTabs = ({ isScrolled }: HeaderTabsProps) => {
  return (
    <nav
      className={`
        absolute flex items-center transition-all duration-500 ease-in-out
        ${isScrolled ? 'left-[100px] translate-x-0' : 'left-1/2 -translate-x-1/2'}
        ${!isScrolled ? 'gap-3' : 'gap-1'}
      `}
    >
      {NAV_ITEMS.map(({ path, label, iconName }, index) => (
        <div key={path} className="flex items-center">
          <NavLink to={path}>
            {({ isActive }) =>
              !isScrolled ? (
                <Button
                  variant="onPrimary"
                  size="md"
                  icon={iconName}
                  shape="round"
                  className="px-4 py-2 border border-on-primary"
                  tabIndex={-1}
                >
                  {label}
                </Button>
              ) : (
                <div
                  className={`
                    flex items-center gap-1.5 transition-all duration-300 rounded-full
                    label-large state-layer px-2 py-1 bg-transparent
                    ${isActive ? 'text-secondary' : 'text-on-primary'}
                  `}
                >
                  <Icon name={iconName} size={16} className="text-current" />
                  <span>{label}</span>
                </div>
              )
            }
          </NavLink>

          <span
            className={`
              mx-2 text-outline-variant transition-opacity duration-300
              ${isScrolled && index < NAV_ITEMS.length - 1 ? 'opacity-100' : 'hidden opacity-0'}
            `}
          >
            |
          </span>
        </div>
      ))}
    </nav>
  );
};

export default HeaderTabs;