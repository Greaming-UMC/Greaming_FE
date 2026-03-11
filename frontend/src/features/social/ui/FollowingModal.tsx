import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import FollowingListSection from './sections/FollowingListSection';

import { useInfiniteFollowings, useFollowAction } from '../hooks/useSocial';
import { useQueryClient } from '@tanstack/react-query';
import type { FollowUserInfo, FollowListUserResponse } from '../../../apis/types/common';

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number; 
}

const FollowingModal = ({ isOpen, onClose, userId }: FollowingModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FollowUserInfo | null>(null);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  const queryClient = useQueryClient(); 
  
  // 1️⃣ 실제 API 로직
  const { 
    data: apiData, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading: isApiLoading
  } = useInfiniteFollowings(userId, isOpen, 10);

  const { unfollowMutation, followMutation } = useFollowAction();

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 매핑 (Server Response -> UI Model)
  // ==========================================================
  
  const followingList = useMemo(() => {
    // 💡 에러 해결: page.result.users 경로로 접근
    const rawUsers = apiData?.pages.flatMap(page => {
      // @ts-ignore: 타입 불일치 방지 및 런타임 구조 우선 참조
      return page.result?.users ?? (page as any).data?.users ?? [];
    }) ?? [];

    // UI용 FollowUserInfo 구조로 변환하여 반환
    return rawUsers.map((user: FollowListUserResponse): FollowUserInfo => ({
      userId: user.userId,
      nickname: user.nickname,
      profileImgUrl: user.profileImgUrl ?? '',
      journeyLevel: user.journeyLevel, 
      // 🟢 팔로잉 목록이므로 기본적으로 true, 언팔로우 시 false 처리
      isFollowing: user.following && !removedIds.includes(user.userId),
      followState: 'COMPLETED',
      // 🟢 Section 컴포넌트에서 해시태그로 뿌려줄 데이터 전달
      ...({ specialtyTags: user.specialtyTags } as any)
    }));
  }, [apiData, removedIds]);

  const handleFetchNext = useCallback(() => {
    if (isOpen && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ==========================================================
  // 🟢 [SECTION 2] 무한 스크롤 & 초기화
  // ==========================================================
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !isOpen) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) handleFetchNext();
    }, { root: scrollRef.current, threshold: 0.1 });
    
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext]);

  useEffect(() => {
    if (isOpen) setSearchTerm("");
  }, [isOpen]);

  // ==========================================================
  // 🟢 [SECTION 3] 핸들러
  // ==========================================================

  const handleToggleFollow = (id: number) => {
    const isCurrentlyRemoved = removedIds.includes(id);
    
    if (isCurrentlyRemoved) {
      // 다시 팔로우 요청
      followMutation.mutate(id, {
        onSuccess: () => setRemovedIds(prev => prev.filter(rid => rid !== id))
      });
      return;
    }

    const target = followingList.find(u => u.userId === id);
    if (target) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    }
  };

  const handleUnfollowConfirm = () => {
    if (!selectedUser) return;
    unfollowMutation.mutate(selectedUser.userId, {
      onSuccess: () => {
        setRemovedIds(prev => [...prev, selectedUser.userId]);
        setIsConfirmOpen(false);
      }
    });
  };

  const handleModalClose = () => {
    // 모달 닫을 때 쿼리 무효화하여 실제 리스트 갱신
    if (removedIds.length > 0) {
      queryClient.invalidateQueries({ queryKey: ['followings', userId] });
    }
    setRemovedIds([]);
    onClose();
  };

  const displayList = useMemo(() => {
    return followingList.filter(u => u.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [followingList, searchTerm]);

  return (
    <>
      <Modal open={isOpen} onClose={handleModalClose} variant="default">
        <Modal.Header title="팔로잉" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="팔로잉 검색" customSize="large" />
          </div>

          <div ref={scrollRef} className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar">
            {isApiLoading ? (
              <div className="py-20 text-center label-xlarge animate-pulse">목록을 불러오는 중...</div>
            ) : (
              <>
                <FollowingListSection users={displayList} onToggle={handleToggleFollow} />
                <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
                  {hasNextPage && isFetchingNextPage && (
                    <span className="text-label-small animate-pulse">추가 목록 불러오는 중...</span>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Body> 
      </Modal>

      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4 font-bold">{selectedUser?.nickname}님을 팔로우 해제 하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="primary" shape="square" widthMode="fixed" width="150px" onClick={() => setIsConfirmOpen(false)}>취소</Button>
            <Button 
              variant="secondary" 
              shape="square"
              widthMode="fixed" 
              width="150px" 
              textClassName="label-xlarge-emphasized"
              disabled={unfollowMutation.isPending}
              onClick={handleUnfollowConfirm}
            >
              팔로우 해제
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowingModal;