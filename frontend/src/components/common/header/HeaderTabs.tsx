import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Button, ListBase } from "../input";
import Icon, { type IconName } from "../Icon";
import { useOnClickOutside } from "./hooks/useOnClickOutside";

type NavLinkItem = { type: "link"; path: string; label: string; iconName: IconName };
type NavPopoverItem = { type: "popover"; id: string; label: string; iconName: IconName };
type NavItemType = NavLinkItem | NavPopoverItem;

const NAV_ITEMS: NavItemType[] = [
  { type: "link", path: "/my-room", label: "My Room", iconName: "nav_myroom" },
  { type: "link", path: "/journey", label: "Journey", iconName: "nav_journy" },
  { type: "popover", id: "circle", label: "Circle", iconName: "nav_circle" },
];

interface HeaderTabsProps {
  isScrolled: boolean;
}

const HeaderTabs = ({ isScrolled }: HeaderTabsProps) => {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popoverRef, () => setActivePopover(null));

  const handlePopoverClick = (id: string) => {
    setActivePopover((prev) => (prev === id ? null : id));
  };

  return (
    <nav
      className={`flex items-center transition-all duration-300 ease-in-out ${
        isScrolled ? 'gap-2' : 'gap-3'
      }`}
    >
      {NAV_ITEMS.map((item, index) => {
        const itemId = item.type === "popover" ? item.id : null;
        const isPopoverActive = itemId && activePopover === itemId;

        const renderContent = (isActiveLink: boolean, onClick?: () => void) => {
          const isActive = isActiveLink || isPopoverActive;
          
          if (!isScrolled) {
            // 스크롤되지 않았을 때 (Button 스타일)
            return (
              <Button
                variant="onPrimary"
                size="md"
                icon={item.iconName}
                shape="round"
                className={`px-4 py-2 border border-on-primary transition-colors ${
                  isActive ? "bg-primary text-white" : ""
                }`}
                tabIndex={-1}
                onClick={onClick}
              >
                {item.label}
              </Button>
            );
          } else {
            // 스크롤되었을 때 (텍스트 + 아이콘 스타일)
            return (
              <div
                onClick={onClick}
                className={`
                  flex items-center gap-1.5 transition-all duration-300 rounded-full
                  label-large state-layer px-2 py-1 bg-transparent cursor-pointer
                  ${isActive ? "text-secondary" : "text-on-primary"}
                `}
              >
                <Icon name={item.iconName} size={16} className="text-current" />
                <span>{item.label}</span>
              </div>
            );
          }
        };

        return (
          <div key={item.label} className="relative flex items-center" ref={item.type === 'popover' ? popoverRef : null}>
            {item.type === "link" ? (
              <NavLink to={item.path}>
                {({ isActive }) => renderContent(isActive)}
              </NavLink>
            ) : (
              <div className="relative">
                {renderContent(false, () => handlePopoverClick(item.id))}
                
                {isPopoverActive && (
                  <div className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-lg shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <ListBase
                      size="md"
                      title="추가하기"
                      leadingIcon="plus"
                      radius="md"
                      className="cursor-pointer hover:bg-gray-100 text-gray-700"
                      onClick={() => {
                        console.log("Circle 추가하기 클릭");
                        setActivePopover(null);
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* 구분선 (|) */}
            <span
              className={`
                mx-1 text-outline-variant transition-opacity duration-300
                ${isScrolled && index < NAV_ITEMS.length - 1 ? "opacity-100" : "opacity-0 hidden"}
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