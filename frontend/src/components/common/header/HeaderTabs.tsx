import { NavLink } from "react-router-dom";
import { Button, ListBase } from "../input";
import Icon, { type IconName } from "../Icon";
import { Dropdown } from "../feedback/Dropdown";

type NavLinkItem = { type: "link"; path: string; label: string; iconName: IconName };
type NavPopoverItem = { type: "popover"; id: string; label: string; iconName: IconName };
type NavItemType = NavLinkItem | NavPopoverItem;

const NAV_ITEMS: NavItemType[] = [
  { type: "link", path: "/profile", label: "My Room", iconName: "nav_myroom" },
  { type: "link", path: "/journey", label: "Journey", iconName: "nav_journy" },
  { type: "popover", id: "circle", label: "Circle", iconName: "nav_circle" },
];

interface HeaderTabsProps {
  isScrolled: boolean;
}

const HeaderTabs = ({ isScrolled }: HeaderTabsProps) => {
  const renderTabContent = (item: NavItemType, isActive: boolean) => {
    if (!isScrolled) {
      // 스크롤 안 됐을 때
      return (
        <Button
          variant="onPrimary"
          size="md"
          icon={item.iconName}
          shape="round"
          className={`px-4 py-2 border border-on-primary transition-colors ${
            isActive ? "bg-primary text-on-surface-variant-bright" : ""
          }`}
          tabIndex={-1}
        >
          {item.label}
        </Button>
      );
    } else {
      // 스크롤 됐을 때
      return (
        <div
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
    <nav
      className={`flex items-center transition-all duration-300 ease-in-out ${
        isScrolled ? "gap-2" : "gap-3"
      }`}
    >
      {NAV_ITEMS.map((item, index) => {
        return (
          <div key={item.label} className="relative flex items-center">
            {item.type === "link" ? (
              <NavLink to={item.path}>
                {({ isActive }) => renderTabContent(item, isActive)}
              </NavLink>
            ) : (
              
              <Dropdown
                align="left"
                trigger={
                  <button type="button">
                    {renderTabContent(item, false)} 
                  </button>
                }
              >
                <div className="w-[200px] bg-surface rounded-lg shadow-xl p-2 animate-in fade-in zoom-in-95 duration-200">
                  <ListBase
                    size="md"
                    title="추가하기"
                    leadingIcon="plus"
                    radius="md"
                    className="cursor-pointer text-on-surface"
                    onClick={() => console.log("Circle 추가하기 클릭")}
                  />
                </div>
              </Dropdown>
            )}

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