import { Button } from "../../../components/common/input/Button/Button";
import { type SettingTab } from './SettingView';
import clsx from "clsx";

interface SettingDrawerProps {
  activeTab: SettingTab;
  onTabChange: (tab: SettingTab) => void;
}

const SettingDrawer = ({ activeTab, onTabChange }: SettingDrawerProps) => {
  const menus: { id: SettingTab; label: string; icon: any }[] = [ // IconName 타입에 맞춰 적용
    { id: 'profile', label: '프로필 설정', icon: 'person' },
    { id: 'account', label: '계정', icon: 'lock' },
    { id: 'privacy', label: '개인정보', icon: 'gear' },
  ];

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col w-full mt-17 gap-1">
        {menus.map((menu) => {
          const isActive = activeTab === menu.id;

          return (
            <Button
              key={menu.id}
              onClick={() => onTabChange(menu.id)}
              // 활성화 상태에 따라 variant를 동적으로 변경
              variant={isActive ? "surfaceVariant" : "text"}
              icon={menu.icon}
              iconPosition="leading"
              iconSize={24}
              widthMode="fill"
              shape="square"
              // 버튼 내부 텍스트 스타일 강제 적용
              className={clsx(
                "!justify-start py-6 px-4 !label-xlarge-emphasized transition-all",
                !isActive && "text-on-surface-variant-lowest"
              )}
            >
              {menu.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingDrawer;