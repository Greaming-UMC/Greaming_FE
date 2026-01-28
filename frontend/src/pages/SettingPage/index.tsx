import { useState } from 'react';
import { Button } from '../../components/common';
import SettingView from '../../features/setting/ui/SettingView';
import FollowingModal from '../../features/social/ui/FollowingModal';
import FollowerModal from '../../features/social/ui/FollowerModal';
import CreateCircleModal from '../../features/social/ui/CircleCreateModal';

const SettingPage = () => {
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isCreateCircleModalOpen, setIsCreateCircleModalOpen] = useState(false); // 추가

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <div className="h-[200px] rounded-large bg-surface-variant" />
      <h1 className="text-display-medium">설정 페이지</h1>

      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant="outlined"
          size="md"
          shape="round"
          widthMode="hug"
          onClick={() => setIsFollowingModalOpen(true)}
        >
          팔로잉 목록 보기
        </Button>

        <Button
          variant="outlined"
          size="md"
          shape="round"
          widthMode="hug"
          onClick={() => setIsFollowerModalOpen(true)}
        >
          팔로워 목록 보기
        </Button>

        {/* 써클 만들기 버튼 추가 */}
        <Button
          variant="primary" // 강조를 위해 primary 사용
          size="md"
          shape="round"
          widthMode="hug"
          onClick={() => setIsCreateCircleModalOpen(true)}
        >
          써클 만들기
        </Button>
      </div>

      <SettingView />

      <FollowingModal 
        isOpen={isFollowingModalOpen} 
        onClose={() => setIsFollowingModalOpen(false)} 
      />

      <FollowerModal 
        isOpen={isFollowerModalOpen} 
        onClose={() => setIsFollowerModalOpen(false)} 
      />

      {/* 써클 만들기 모달 추가 */}
      <CreateCircleModal
        isOpen={isCreateCircleModalOpen} 
        onClose={() => setIsCreateCircleModalOpen(false)} 
      />

      <div className="h-[1500px] rounded-large bg-surface-variant" />
    </div>
  );
};

export default SettingPage;