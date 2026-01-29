import { ListBase } from '../../input';
import type { UserInfo } from '../types';

interface ProfilePopupProps {
  userInfo?: UserInfo;
  onLogout?: () => void;
}

const ProfilePopup = ({ userInfo, onLogout }: ProfilePopupProps) => {
  return (
    <div className="absolute top-full right-0 mt-3 w-[240px] bg-surface rounded-lg shadow-xl py-2">
      <div className="px-4 pb-2 border-b border-surface-variant-low">
        <ListBase
          size="lg"
          title={userInfo?.nickname ?? '임시 사용자'}
          className="pointer-events-none"
        />
      </div>

      <ListBase
        size="md"
        title="프로필 설정"
        className="text-on-surface cursor-pointer"
        onClick={() => {
          console.log('프로필 설정');
        }}
      />

      <ListBase
        size="md"
        title="계정"
        className="text-on-surface cursor-pointer"
        onClick={() => {
          console.log('계정');
        }}
      />

      <ListBase
        size="md"
        title="개인정보"
        className="text-on-surface cursor-pointer"
        onClick={() => {
          console.log('개인정보');
        }}
      />

      <div className="border-t border-surface-variant-low mt-2 pt-2">
        <ListBase
          size="md"
          title="로그아웃"
          onClick={onLogout}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProfilePopup;
