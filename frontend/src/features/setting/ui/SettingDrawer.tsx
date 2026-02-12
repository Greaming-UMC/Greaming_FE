import { Button } from "../../../components/common/input/Button/Button";
import { type SettingTab } from './SettingView';
import clsx from "clsx";

interface SettingDrawerProps {
  activeTab: SettingTab;
  onTabChange: (tab: SettingTab) => void;
  isChanged: boolean; // 🟢 부모로부터 수정 여부를 받음
}

const SettingDrawer = ({ activeTab, onTabChange, isChanged }: SettingDrawerProps) => {
  const menus: { id: SettingTab; label: string; icon: any }[] = [
    { id: 'profile', label: '프로필 설정', icon: 'person' },
    { id: 'account', label: '계정', icon: 'lock' },
    { id: 'privacy', label: '개인정보', icon: 'gear' },
  ];

  // 🟢 탭 변경 시 차단 로직
  const handleTabClick = (nextTab: SettingTab) => {
    if (activeTab === nextTab) return;

    if (isChanged) {
      const proceed = window.confirm("수정 중인 내용이 저장되지 않을 수 있습니다. 이동하시겠습니까?");
      if (!proceed) return; // 취소 시 함수 종료
    }
    
    onTabChange(nextTab);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col w-full mt-17 gap-1">
        {menus.map((menu) => {
          const isActive = activeTab === menu.id;

          return (
            <Button
              key={menu.id}
              onClick={() => handleTabClick(menu.id)}
              variant={isActive ? "surfaceVariant" : "text"}
              icon={menu.icon}
              iconPosition="leading"
              iconSize={24}
              widthMode="fill"
              shape="square"
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