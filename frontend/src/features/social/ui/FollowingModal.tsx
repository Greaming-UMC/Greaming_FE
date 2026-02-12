import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import FollowingListSection from './sections/FollowingListSection';

// 🟢 실제 API 훅 및 목업 데이터 임포트
import { useInfiniteFollowings, useFollowAction } from '../hooks/useSocial';
import { useQueryClient } from '@tanstack/react-query';
import type { FollowUserInfo } from '../../../apis/types/common';
import { MOCK_FOLLOWING_RESPONSE } from '../testing/mockdata';

interface FollowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number; 
}

const FollowingModal = ({ isOpen, onClose, userId }: FollowingModalProps) => {
  // 💡 모드 스위치 (개발 시 false, 실전 시 true)
  const isApiMode = true; 

  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FollowUserInfo | null>(null);
  const [removedIds, setRemovedIds] = useState<number[]>([]);

  const queryClient = useQueryClient(); 
  
  

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 제어 섹션
  // ==========================================================

  /** 🛠️ [MODE A] 목업 로직 전용 상태 */
  const [mockList, setMockList] = useState<FollowUserInfo[]>([]);
  const [isMockLoading, setIsMockLoading] = useState(false);

  /** 🌐 [MODE B] 실제 API 로직 (Family A - data 기반) */
  const { 
    data: apiData, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading: isApiLoading
  } = useInfiniteFollowings(userId, 10);

  const { unfollowMutation, followMutation } = useFollowAction();
  
  // 통합 리스트 추출
  const followingList = useMemo(() => {
    if (!isApiMode) return mockList;
    // Family A 규격에 맞춰 data.data.data 순서로 접근
    return apiData?.pages.flatMap(p => p.data?.data ?? []) ?? [];
  }, [isApiMode, apiData, mockList]);

  // 목업 데이터 로드 시뮬레이션
  const loadMockData = useCallback(() => {
    setIsMockLoading(true);
    setTimeout(() => {
      const mockDataArr = MOCK_FOLLOWING_RESPONSE.data?.data ?? [];
      setMockList(mockDataArr);
      setIsMockLoading(false);
    }, 500);
  }, []);

  // 통합 다음 페이지 호출
  const handleFetchNext = useCallback(() => {
    if (isApiMode && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isApiMode, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ==========================================================
  // 🟢 [SECTION 2] 자동 스크롤 감지 (Intersection Observer)
  // ==========================================================
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !isOpen || !isApiMode) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) handleFetchNext();
    }, { root: scrollRef.current, threshold: 0.1 });
    
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext, isApiMode]);

  // ==========================================================
  // 🟢 [SECTION 3] 핸들러 및 이펙트
  // ==========================================================

  const handleToggleFollow = (id: number) => {
    const isCurrentlyRemoved = removedIds.includes(id);
    
    // 1. 이미 언팔로우 상태(removedIds에 있음) -> 다시 팔로우
    if (isCurrentlyRemoved) {
      if (isApiMode) {
        followMutation.mutate(id, {
          onSuccess: () => setRemovedIds(prev => prev.filter(rid => rid !== id))
        });
      } else {
        setRemovedIds(prev => prev.filter(rid => rid !== id));
      }
      return;
    }

    // 2. 팔로잉 상태 -> 언팔로우 컨펌 모달 띄우기
    const target = followingList.find(u => u.userId === id);
    if (target) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    }
  };

  const handleUnfollowConfirm = () => {
    if (!selectedUser) return;
    if (isApiMode) {
      unfollowMutation.mutate(selectedUser.userId, {
        onSuccess: () => {
          setRemovedIds(prev => [...prev, selectedUser.userId]);
          setIsConfirmOpen(false);
        }
      });
    } else {
      setRemovedIds(prev => [...prev, selectedUser.userId]);
      setIsConfirmOpen(false);
    }
  };

  const handleModalClose = () => {
    if (removedIds.length > 0 && isApiMode) {
      // 💡 모달 닫을 때만 쿼리 무효화하여 리스트 갱신 (UX 최적화)
      queryClient.invalidateQueries({ queryKey: ['followings', userId] });
    }
    setRemovedIds([]);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      if (!isApiMode) loadMockData();
    }
  }, [isOpen, isApiMode, loadMockData]);

  // 화면에 보여줄 필터링된 리스트
  const displayList = useMemo(() => {
    return followingList
      .map(user => ({
        ...user,
        isFollowing: !removedIds.includes(user.userId)
      }))
      .filter(u => u.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [followingList, removedIds, searchTerm]);

  return (
    <>
      <Modal open={isOpen} onClose={handleModalClose} variant="default">
        <Modal.Header title={`팔로잉 ${!isApiMode ? '(MOCK)' : ''}`} />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="팔로잉 검색" customSize="large" />
          </div>

          <div ref={scrollRef} className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar">
            {(isApiMode ? isApiLoading : isMockLoading) ? (
              <div className="py-20 text-center label-xlarge text-on-surface-variant animate-pulse">
                목록을 불러오는 중...
              </div>
            ) : (
              <>
                <FollowingListSection users={displayList} onToggle={handleToggleFollow} />
                <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
                  {isApiMode && isFetchingNextPage && (
                    <span className="text-label-small text-on-surface-variant-lowest animate-pulse">
                      추가 목록 불러오는 중...
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Body> 
      </Modal>

      {/* 언팔로우 컨펌 */}
      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4 font-bold">{selectedUser?.nickname}님을 팔로우 해제 하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="primary" shape="square" width="150px" onClick={() => setIsConfirmOpen(false)}>취소</Button>
            <Button 
              variant="secondary" 
              shape="square"
              width="150px" 
              textClassName="label-xlarge-emphasized"
              disabled={isApiMode ? unfollowMutation.isPending : false}
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