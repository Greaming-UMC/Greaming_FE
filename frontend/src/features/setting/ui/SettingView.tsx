import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SettingDrawer from './SettingDrawer';
import ProfileSection from './sections/ProfileSection';
import AccountSection from './sections/AccountSection';
import PrivacySection from './sections/PrivacySection';
import clsx from "clsx";

export type SettingTab = 'profile' | 'account' | 'privacy';

const SettingView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as SettingTab) || 'profile';

  // 🟢 프로필 수정 여부를 부모에서 관리하여 Drawer와 Section에 공유
  const [isChanged, setIsChanged] = useState(false);

  const handleTabChange = (tab: SettingTab) => {
    setSearchParams({ tab });
  };

  const renderSection = () => {
    switch (activeTab) {
      // 🟢 하위 섹션에 수정 상태 변경 함수 전달
      case 'profile': return <ProfileSection isChanged={isChanged} setIsChanged={setIsChanged} />;
      case 'account': return <AccountSection />;
      case 'privacy': return <PrivacySection />;
      default: return <ProfileSection isChanged={isChanged} setIsChanged={setIsChanged} />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-surface-variant-high">
      <div className="flex w-full max-w-[1280px] gap-[56px] py-[145px] items-stretch">
        
        <nav className={clsx(
          "flex flex-col w-[266px] min-w-[266px] bg-surface px-5",
          "rounded-extra-large"
        )}>
          {/* 🟢 Drawer에 수정 상태 전달 */}
          <SettingDrawer 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            isChanged={isChanged} 
          />
        </nav>

        <main className="flex-1">
          <div className={clsx(
            "h-full w-full max-w-[1110px] bg-surface px-15 py-12",
            "rounded-extra-large",
          )}>
            {renderSection()}
          </div>
        </main>
      </div>

      <div className="h-[600px] rounded-large bg-surface-variant-low" />
    </div>
  );
};

export default SettingView;