import { useState } from 'react';
import { Button } from '../../components/common';
import FollowingModal from '../../features/social/ui/FollowingModal';
import FollowerModal from '../../features/social/ui/FollowerModal';
import CreateCircleModal from '../../features/social/ui/CircleCreateModal';
import CircleSearchModal from '../../features/social/ui/CircleSearchModal';
import CircleMemberModal from '../../features/social/ui/CircleMemberModal';
import { MOCK_CURRENT_CIRCLE_ID, MOCK_MY_INFO } from '../../features/social/testing/mockdata';
import CircleManageModal from '../../features/social/ui/CircleManageModal';

const ModalPracticePage = () => {
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isCreateCircleModalOpen, setIsCreateCircleModalOpen] = useState(false);
  const [isCircleSearchModalOpen, setIsCircleSearchModalOpen] = useState(false);
  const [isCircleMemberModalOpen, setIsCircleMemberModalOpen] = useState(false);
  const [isCircleManageModalOpen, setIsCircleManageModalOpen] = useState(false); // 🟢 추가

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <div className="h-[200px] rounded-large bg-surface-variant w-full" />
      <h1 className="text-display-medium">설정 페이지</h1>

      <div className="flex gap-2 flex-wrap justify-center">
        <Button variant="outlined" size="md" shape="round" widthMode="hug" onClick={() => setIsFollowingModalOpen(true)}>
          팔로잉 목록 보기
        </Button>

        <Button variant="outlined" size="md" shape="round" widthMode="hug" onClick={() => setIsFollowerModalOpen(true)}>
          팔로워 목록 보기
        </Button>

        <Button variant="outlined" size="md" shape="round" widthMode="hug" onClick={() => setIsCircleSearchModalOpen(true)}>
          써클 검색하기
        </Button>

        <Button variant="outlined" size="md" shape="round" widthMode="hug" onClick={() => setIsCircleMemberModalOpen(true)}>
          써클 멤버 확인
        </Button>

        {/* 🟢 초대/내보내기 관리 버튼 추가 */}
        <Button variant="outlined" size="md" shape="round" widthMode="hug" onClick={() => setIsCircleManageModalOpen(true)}>
          써클 관리(초대/내보내기)
        </Button>

        <Button variant="primary" size="md" shape="round" widthMode="hug" onClick={() => setIsCreateCircleModalOpen(true)}>
          써클 만들기
        </Button>
      </div>


      {/* 모달들 */}
      <FollowingModal isOpen={isFollowingModalOpen} onClose={() => setIsFollowingModalOpen(false)} userId={2}/>
      <FollowerModal isOpen={isFollowerModalOpen} onClose={() => setIsFollowerModalOpen(false)} userId={2} />
      
      <CircleSearchModal 
        isOpen={isCircleSearchModalOpen} 
        onClose={() => setIsCircleSearchModalOpen(false)} 
      />

      <CircleMemberModal
        isOpen={isCircleMemberModalOpen} 
        onClose={() => setIsCircleMemberModalOpen(false)} 
        circleId={MOCK_CURRENT_CIRCLE_ID}
      />

      {/* 🟢 써클 관리 모달 추가 */}
      <CircleManageModal
        isOpen={isCircleManageModalOpen}
        onClose={() => setIsCircleManageModalOpen(false)}
        circleId={MOCK_CURRENT_CIRCLE_ID}
      />

      <CreateCircleModal isOpen={isCreateCircleModalOpen} onClose={() => setIsCreateCircleModalOpen(false)} />

      <div className="h-[1500px] rounded-large bg-surface-variant w-full" />
    </div>
  );
};

export default ModalPracticePage;