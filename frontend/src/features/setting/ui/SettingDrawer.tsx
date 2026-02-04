import Icon, { type IconName } from '../../../components/common/Icon';
import { type SettingTab } from './SettingView';
import clsx from "clsx";

interface SettingDrawerProps {
  activeTab: SettingTab;
  onTabChange: (tab: SettingTab) => void;
}

const SettingDrawer = ({ activeTab, onTabChange }: SettingDrawerProps) => {
  const menus: { id: SettingTab; label: string; icon: IconName }[] = [
    { id: 'profile', label: '프로필 설정', icon: 'person' },
    { id: 'account', label: '계정', icon: 'lock' },
    { id: 'privacy', label: '개인정보', icon: 'person' },
  ];

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col w-full mt-17">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => onTabChange(menu.id)}
            className={clsx(
              "flex items-center w-full py-3 px-4 transition-all gap-1 label-xlarge-emphasized cursor-pointer",
              "rounded-medium", 
              activeTab === menu.id 
                ? "bg-surface-variant-low text-on-surface" 
                : "text-on-surface-variant-lowest state-layer surface-variant-opacity-8" 
            )}
          >
            <Icon 
              name={menu.icon} 
              size={24} 
              className={clsx(
                "transition-colors",
                activeTab === menu.id ? "fill-on-surface" : "fill-on-surface-variant-lowest"
              )} 
            />
            {menu.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingDrawer;