import { useSearchParams } from 'react-router-dom'; // 1. 훅 임포트
import SettingDrawer from './SettingDrawer';
import ProfileSection from './sections/ProfileSection';
import AccountSection from './sections/AccountSection';
import PrivacySection from './sections/PrivacySection';

export type SettingTab = 'profile' | 'account' | 'privacy';

const SettingView = () => {
  // 2. useState 대신 searchParams를 사용합니다.
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL에서 'tab' 값을 읽어오고, 없으면 기본값 'profile'을 사용합니다.
  const activeTab = (searchParams.get('tab') as SettingTab) || 'profile';

  // 탭 변경 시 URL의 쿼리 파라미터를 업데이트합니다.
  const handleTabChange = (tab: SettingTab) => {
    setSearchParams({ tab });
    console.log(`${tab} 탭으로 URL 변경 및 이동`);
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
    <div className="flex flex-col items-center w-full min-h-screen bg-surface-variant-high">
      <div className="flex w-full max-w-[1280px] gap-[40px] py-[145px] items-stretch">
        
        {/* 사이드바 */}
        <nav className="flex flex-col w-[266px] min-w-[266px] bg-surface rounded-[24px] shadow-sm p-6">
          {/* handleTabChange 함수를 전달합니다. */}
          <SettingDrawer activeTab={activeTab} onTabChange={handleTabChange} />
        </nav>

        {/* 메인 콘텐츠 */}
        <main className="flex-1">
          <div className="h-full w-full max-w-[1110px] bg-surface rounded-[24px] border border-gray-100 p-12 shadow-sm">
            {renderSection()}
          </div>
        </main>
      </div>

      <div className="h-[600px] rounded-large bg-surface-variant" />
    </div>
  );
};

export default SettingView;