
import Icon, { type IconName } from '../../../components/common/Icon';
import { type SettingTab } from './SettingView'; // 부모에서 정의한 타입 가져옴

interface SettingDrawerProps {
  activeTab: SettingTab; // string 대신 정확한 타입 사용
  onTabChange: (tab: SettingTab) => void;
}

const SettingDrawer = ({ activeTab, onTabChange }: SettingDrawerProps) => {
  // 메뉴 리스트도 SettingTab 타입에 의존하게 만듦
  const menus: { id: SettingTab; label: string; icon: IconName }[] = [
    { id: 'profile', label: '프로필 설정', icon: 'person' },
    { id: 'account', label: '계정', icon: 'lock' },
    { id: 'privacy', label: '개인정보', icon: 'person' },
  ];

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex flex-col w-full gap-[1px]">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => onTabChange(menu.id)}
            className={`
              flex items-center w-full py-[12px] px-4 rounded-[12px] transition-all gap-2 label-xlarge-emphasized cursor-pointer
              ${activeTab === menu.id 
                ? 'bg-surface-variant text-on-surface' 
                : 'text-gray-400 state-layer opacity-80'}
            `}
          >
            <Icon 
              name={menu.icon} 
              size={24} 
              className={activeTab === menu.id ? 'fill-on-surface' : 'fill-gray-400'} 
            />
            {menu.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingDrawer;