import { useState } from 'react';
import SettingDrawer from './SettingDrawer';
import ProfileSection from './sections/ProfileSection';
import AccountSection from './sections/AccountSection';
import PrivacySection from './sections/PrivacySection';

// 페이지 타입 정의
export type SettingTab = 'profile' | 'account' | 'privacy';

const SettingView = () => {
  const [activeTab, setActiveTab] = useState<SettingTab>('profile');

  const renderSection = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSection />;
      case 'account': return <AccountSection />;
      case 'privacy': return <PrivacySection />;
      default: return <ProfileSection />;
    }
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-surface-variant-high">
      <div className="flex w-full max-w-[1280px] gap-[40px] py-[145px]"> {/* 상단 여백을 컨테이너에 주어 사이드바를 내림 */}
        
        {/* 사이드바: h-screen 제거, 상단 고정 위치 조정, 사방 라운드 적용 */}
        <nav className="flex flex-col items-start w-[266px] min-w-[266px] bg-surface pt-[80px] px-[19px] pb-[89px] rounded-[24px] shadow-sm">
          <SettingDrawer activeTab={activeTab} onTabChange={setActiveTab} />
        </nav>

        {/* 메인 콘텐츠: 사이드바와 나란히 배치 */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1110px] min-h-[000px] bg-surface rounded-[24px] border border-gray-100 p-12 shadow-sm">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingView;