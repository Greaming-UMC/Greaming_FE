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

  const [isChanged, setIsChanged] = useState(false);

  const handleTabChange = (tab: SettingTab) => {
    setSearchParams({ tab });
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSection isChanged={isChanged} setIsChanged={setIsChanged} />;
      case 'account': return <AccountSection />;
      case 'privacy': return <PrivacySection />;
      default: return <ProfileSection isChanged={isChanged} setIsChanged={setIsChanged} />;
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-surface-variant-high">
      <div className="flex w-full max-w-[80rem] gap-[3.5rem] py-[5rem] items-stretch">
        
        <nav className={clsx(
          "flex flex-col w-[16.625rem] min-w-[16.625rem] bg-surface px-5",
          "rounded-extra-large"
        )}>
          <SettingDrawer 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
            isChanged={isChanged} 
          />
        </nav>

        <main className="flex-1">
          <div className={clsx(
            "h-full w-full max-w-[69.375rem] bg-surface px-[3.75rem] py-[3rem]",
            "rounded-extra-large",
          )}>
            {renderSection()}
          </div>
        </main>
      </div>

      <div className="h-[37.5rem] rounded-large bg-surface-variant-low" />
    </div>
  );
};

export default SettingView;