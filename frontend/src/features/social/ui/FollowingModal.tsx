import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { SocialUserItem } from '../types';
import FollowingListSection from './sections/FollowingListSection';

/** 🛠️ [MODE A] 목업 데이터 */
import { MOCK_FOLLOWING_LIST } from '../testing/mockdata'; 

/** 🌐 [MODE B] 실제 API (연결 시 주석 해제) */
// import { useInfiniteFollowings, useFollowAction } from '../hooks/useSocial';
// import { useQueryClient } from '@tanstack/react-query';

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number; 
}

const FollowingModal = ({ isOpen, onClose, userId }: FollowingModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SocialUserItem | null>(null);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  // const queryClient = useQueryClient(); // API 모드 시 필요

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 제어 섹션
  // ==========================================================

  /** 🛠️ [MODE A] 목업 로직 */
  const [followingList, setFollowingList] = useState<SocialUserItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchMockData = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFollowingList(MOCK_FOLLOWING_LIST.slice(0, page * 10));
      setIsLoading(false);
    }, 300);
  }, [page]);

  /** 🌐 [MODE B] 실제 API 로직 예시 */
  /*
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteFollowings(userId);
  const { unfollowMutation, followMutation } = useFollowAction();
  
  const followingList = useMemo(() => data?.pages.flatMap(p => p.data?.data ?? []) ?? [], [data]);
  */

  // ==========================================================
  // 🟢 [SECTION 2] 핵심 핸들러 (버튼 클릭 시 처리)
  // ==========================================================

  const handleUnfollowConfirm = () => {
    if (!selectedUser) return;

    /** 1. 서버에 실제 삭제 요청 보내기 */
    // [MODE A] 목업: 콘솔 로그로 대체
    console.log(`서버 요청: ${selectedUser.userId}번 유저 언팔로우 완료`);
    
    // [MODE B] API: unfollowMutation.mutate(selectedUser.userId);

    /** 2. UI상에서 '해제됨' 상태로 표시하기 위해 ID 저장 */
    setRemovedIds(prev => [...prev, selectedUser.userId]);
    setIsConfirmOpen(false);
  };

  const handleToggleFollow = (userId: number) => {
    // 이미 해제 버튼 눌러서 '팔로우' 버튼으로 바뀐 경우 (다시 팔로우 요청)
    if (removedIds.includes(userId)) {
      
      console.log(`서버 요청: ${userId}번 유저 다시 팔로우 완료`);
      // [MODE B] API: followMutation.mutate(userId);

      setRemovedIds(prev => prev.filter(id => id !== userId));
      return;
    }

    // 처음 '팔로잉' 버튼을 누른 경우 (컨펌 모달 띄우기)
    const target = followingList.find(u => u.userId === userId);
    if (target) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    }
  };

  // ==========================================================
  // 🟢 [SECTION 3] 모달 종료 시 실제 리스트 갱신
  // ==========================================================

  const handleModalClose = () => {
    if (removedIds.length > 0) {
      // 🟢 창을 닫는 시점에 리스트에서 완전히 제거하거나 쿼리를 무효화함
      // [MODE A] 목업: 로컬 상태 필터링
      setFollowingList(prev => prev.filter(u => !removedIds.includes(u.userId)));
      setRemovedIds([]);

      // [MODE B] API: queryClient.invalidateQueries(['followings', userId]);
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      fetchMockData();
    }
  }, [isOpen, fetchMockData]);

  // UI용 리스트 가공
  const displayList = useMemo(() => {
    return followingList.map(user => ({
      ...user,
      isFollowing: !removedIds.includes(user.userId)
    })).filter(u => u.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [followingList, removedIds, searchTerm]);

  return (
    <>
      <Modal open={isOpen} onClose={handleModalClose} variant="default">
        <Modal.Header title="팔로잉" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="검색" customSize="large" />
          </div>
          <FollowingListSection users={displayList} onToggle={handleToggleFollow} />
        </Modal.Body>
      </Modal>

      {/* 컨펌 모달 */}
      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4">{selectedUser?.nickname}님을 팔로우 해제 하시겠습니까? </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="primary" widthMode="fixed" width="150px" onClick={() => setIsConfirmOpen(false)}>취소</Button>
            <Button variant="secondary" widthMode="fixed" width="150px" onClick={handleUnfollowConfirm}>팔로우 해제</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowingModal;