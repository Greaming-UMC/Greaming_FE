import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Divider } from "../display";
import { Button, ListBase } from "../input";
import { type IconName } from "../Icon";
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

const TAB_STYLE_DELAY_MS = 200;

const HeaderTabs = ({ isScrolled }: HeaderTabsProps) => {
  const [isTabsScrolled, setIsTabsScrolled] = useState(isScrolled);

  useEffect(() => {
    if (isScrolled === isTabsScrolled) return;

    const timer = window.setTimeout(() => {
      setIsTabsScrolled(isScrolled);
    }, TAB_STYLE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [isScrolled, isTabsScrolled]);

  const renderTabContent = (item: NavItemType, isActive: boolean) => {
    if (!isTabsScrolled) {
      // 스크롤 안 됐을 때
      return (
        <Button
          variant="nav"
          size="md"
          icon={item.iconName}
          shape="round"
          widthMode="fixed"
          width={160}
          tabIndex={-1}
          className="duration-600 ease-in-out"
        >
          {item.label}
        </Button>
      );
    } else {
      // 스크롤 됐을 때
      return (
        <Button
          variant={isActive ? "textSecondary" : "textOnPrimary"}
          size="xs"
          icon={item.iconName}
          shape="round"
          widthMode="hug"
          className="duration-600 ease-in-out"
        >
          {item.label}
        </Button>
      );
    }
  };

  return (
    <nav
      className={`flex items-center transition-all duration-300 ease-in-out ${
        isTabsScrolled ? "gap-1" : "gap-3"
      }`}
    >
      {NAV_ITEMS.map((item, index) => {
        const showDivider = isTabsScrolled && index < NAV_ITEMS.length - 1;

        return (
          <Fragment key={item.label}>
            <div className="relative">
              {item.type === "link" ? (
                <NavLink to={item.path} end>
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
            </div>

            {showDivider && (
              <Divider
                orientation="vertical"
                thickness={1}
                color="bg-on-primary"
                style={{ height: "16px" }}
              />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default HeaderTabs;
