import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, ListBase } from "../input";
import Icon, { type IconName } from "../Icon";

type NavItemType =
  | { type: "link"; path: string; label: string; iconName: IconName }
  | { type: "popover"; id: string; label: string; iconName: IconName };

const NAV_ITEMS: NavItemType[] = [
  { type: "link", path: "/my-room", label: "My Room", iconName: "nav_myroom" },
  { type: "link", path: "/journey", label: "Journey", iconName: "nav_journy" },
  { type: "popover", id: "circle", label: "Circle", iconName: "nav_circle" },
];

function useOnClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

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
      className={`
        flex items-center transition-all duration-300 ease-in-out
        ${isScrolled ? 'gap-2' : 'gap-3'}
      `}
    >
      {NAV_ITEMS.map((item, index) => {
        const renderItem = (isActive: boolean, onClick?: () => void) => {
          if (!isScrolled) {
            return (
              <Button
                variant="onPrimary"
                size="md"
                icon={item.iconName}
                shape="round"
                className={`px-4 py-2 border border-on-primary ${
                  activePopover === (item as any).id ? "bg-primary text-white" : ""
                }`}
                tabIndex={-1}
                onClick={onClick}
              >
                {item.label}
              </Button>
            );
          } else {
            return (
              <div
                onClick={onClick}
                className={`
                  flex items-center gap-1.5 transition-all duration-300 rounded-full
                  label-large state-layer px-2 py-1 bg-transparent cursor-pointer
                  ${isActive || activePopover === (item as any).id ? "text-secondary" : "text-on-primary"}
                `}
              >
                <Icon name={item.iconName} size={16} className="text-current" />
                <span>{item.label}</span>
              </div>
            );
          }
        };

        return (
          <div key={item.label} className="relative flex items-center">
            {item.type === "link" ? (
              <NavLink to={item.path}>
                {({ isActive }) => renderItem(isActive)}
              </NavLink>
            ) : (
              <div className="relative">
                {renderItem(false, () => handlePopoverClick(item.id))}
                {activePopover === item.id && (
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

            <span
              className={`
                mx-1 text-outline-variant transition-opacity duration-300
                ${isScrolled && index < NAV_ITEMS.length - 1 ? "opacity-100" : "hidden opacity-0"}
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