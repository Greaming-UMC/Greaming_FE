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

  const handleTabChange = (tab: SettingTab) => {
    setSearchParams({ tab });
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSection />;
      case 'account': return <AccountSection />;
      case 'privacy': return <PrivacySection />;
      default: return <ProfileSection />;
    }
  };

  return (
    // 🛠️ 배경색: 시스템 토큰 bg-surface-variant-high 적용
    <div className="flex flex-col items-center w-full min-h-screen bg-surface-variant-high">
      <div className="flex w-full max-w-[1280px] gap-[56px] py-[145px] items-stretch">
        
        {/* 사이드바 */}
        <nav className={clsx(
          "flex flex-col w-[266px] min-w-[266px] bg-surface px-5",
          "rounded-extra-large"
        )}>
          <SettingDrawer activeTab={activeTab} onTabChange={handleTabChange} />
        </nav>

        {/* 메인 콘텐츠 */}
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