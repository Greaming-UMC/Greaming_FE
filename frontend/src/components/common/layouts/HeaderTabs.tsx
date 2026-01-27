import MyRoomIcon from '../../../assets/icon/mono/nav_myroom.svg?react';
import JourneyIcon from '../../../assets/icon/mono/nav_journy.svg?react';
import CircleIcon from '../../../assets/icon/mono/nav_circle.svg?react';
import { NavLink } from 'react-router-dom';

// path 속성
const NAV_ITEMS = [
 { path: '/my-room', label: 'My Room', Icon: MyRoomIcon },
 { path: '/journey', label: 'Journey', Icon: JourneyIcon },
 { path: '/circle', label: 'Circle', Icon: CircleIcon },
] as const;

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
   {NAV_ITEMS.map(({ path, label, Icon }, index) => (
    <div key={path} className="flex items-center">
     <NavLink
      to={path}
      className={({ isActive }) => `
       flex items-center gap-1.5 transition-all duration-300 rounded-full
       label-large state-layer
       ${!isScrolled ? 'bg-primary' : 'bg-transparent'}
       ${
        !isScrolled
         ? 'text-on-primary'
         : isActive
         ? 'text-secondary'
         : 'text-on-primary'
       }
       ${isScrolled ? 'px-2 py-1' : 'px-4 py-2'}
      `}
     >
      <Icon className="h-4 w-4 text-current" />
      <span>{label}</span>
     </NavLink>

     <span
      className={`
       mx-2 text-outline-variant transition-opacity duration-300
       ${isScrolled && index < NAV_ITEMS.length - 1 ? 'opacity-100' : 'opacity-0 hidden'}
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