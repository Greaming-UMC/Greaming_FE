import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { SocialUserItem } from '../types';
import FollowingListSection from './sections/FollowingListSection';

/** 🛠️ [MODE A] 목업 데이터 */
import { MOCK_FOLLOWING_LIST } from '../testing/mockdata'; 

/** 🌐 [MODE B] 실제 API */
import { useInfiniteFollowings, useFollowAction } from '../hooks/useSocial';
import { useQueryClient } from '@tanstack/react-query';

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

  const queryClient = useQueryClient(); 
  
  // 🟢 관찰 및 스크롤을 위한 Ref
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 제어 섹션
  // ==========================================================
  const isApiMode = false; // 💡 테스트 시 false, 실제 연결 시 true

  /** 🛠️ [MODE A] 목업 로직 */
  const [mockList, setMockList] = useState<SocialUserItem[]>([]);
  const [mockPage, setMockPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPageMock, setIsFetchingNextPageMock] = useState(false);

  const pageSize = 10;
  const hasNextPageMock = mockList.length < MOCK_FOLLOWING_LIST.length && searchTerm === "";

  const fetchMockData = useCallback((pageNum: number, isNext: boolean = false) => {
    if (isNext) setIsFetchingNextPageMock(true);
    else setIsLoading(true);
    
    setTimeout(() => {
      const end = pageNum * pageSize;
      const newData = MOCK_FOLLOWING_LIST.slice(0, end);
      setMockList(newData);
      setIsLoading(false);
      setIsFetchingNextPageMock(false);
    }, 300); 
  }, []);

  /** 🌐 [MODE B] 실제 API 로직 */
  const { 
    data, 
    fetchNextPage, 
    hasNextPage: hasNextPageApi, 
    isFetchingNextPage: isFetchingNextPageApi,
    isLoading: isApiLoading
  } = useInfiniteFollowings(userId);
  const { unfollowMutation, followMutation } = useFollowAction();
  
  const followingList = useMemo(() => {
    if (isApiMode) return data?.pages.flatMap(p => p.data?.data ?? []) ?? [];
    return mockList;
  }, [isApiMode, data, mockList]);

  // 통합 다음 페이지 호출 함수
  const handleFetchNext = useCallback(() => {
    if (isApiMode) {
      if (hasNextPageApi && !isFetchingNextPageApi) fetchNextPage();
    } else {
      if (hasNextPageMock && !isFetchingNextPageMock && !isLoading) {
        setMockPage(prev => prev + 1);
      }
    }
  }, [isApiMode, hasNextPageApi, isFetchingNextPageApi, fetchNextPage, hasNextPageMock, isFetchingNextPageMock, isLoading]);

  // ==========================================================
  // 🟢 [SECTION 2] 자동 스크롤 감지 (Intersection Observer)
  // ==========================================================
  const onIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) handleFetchNext();
  }, [handleFetchNext]);

  useEffect(() => {
    if (!loadMoreRef.current || !isOpen) return;
    const observer = new IntersectionObserver(onIntersect, { 
      root: scrollRef.current, // 👈 중요: 모달 내부 스크롤 박스를 기준으로 감지
      threshold: 0.1 
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [onIntersect, isOpen]);

  // ==========================================================
  // 🟢 [SECTION 3] 핸들러 및 이펙트
  // ==========================================================

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

  const handleToggleFollow = (id: number) => {
    const isCurrentlyRemoved = removedIds.includes(id);
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
    const target = followingList.find(u => u.userId === id);
    if (target) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    }
  };

  const handleModalClose = () => {
    if (removedIds.length > 0) {
      if (isApiMode) queryClient.invalidateQueries({ queryKey: ['followings', userId] });
      else setMockList(prev => prev.filter(u => !removedIds.includes(u.userId)));
      setRemovedIds([]);
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      if (!isApiMode) {
        setMockPage(1);
        fetchMockData(1, false);
      }
    }
  }, [isOpen, isApiMode, fetchMockData]);

  useEffect(() => {
    if (mockPage > 1 && isOpen && !isApiMode) fetchMockData(mockPage, true);
  }, [mockPage, isOpen, isApiMode, fetchMockData]);

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

          <div 
            ref={scrollRef}
            className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar"
          >
            {(isApiMode ? isApiLoading : isLoading) && (isApiMode ? true : mockPage === 1) ? (
              <div className="py-20 text-center label-xlarge text-on-surface-variant">데이터를 불러오는 중...</div>
            ) : (
              <>
                <FollowingListSection users={displayList} onToggle={handleToggleFollow} />
                
                {/* 🟢 자동 감지 타겟 (상시 렌더링하여 관찰 끊김 방지) */}
                <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
                  {(isApiMode ? isFetchingNextPageApi : isFetchingNextPageMock) && (
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

      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4">{selectedUser?.nickname}님을 팔로우 해제 하시겠습니까? </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="primary" widthMode="fixed" shape="square" width="150px" onClick={() => setIsConfirmOpen(false)}>취소</Button>
            <Button 
              variant="secondary" 
              widthMode="fixed" 
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