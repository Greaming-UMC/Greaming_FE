import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import FollowerListSection from './sections/FollowerListSection';

// 🟢 실제 API 훅 및 목업 데이터 임포트
import { useInfiniteFollowers, useFollowAction } from '../hooks/useSocial';
import { MOCK_FOLLOWERS_RESPONSE } from '../testing/mockdata'; 
import type { FollowUserInfo } from '../../../apis/types/common';

interface FollowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const FollowerModal = ({ isOpen, onClose, userId }: FollowerModalProps) => {
    // 💡 모드 스위치 (개발 시 false, 실전 시 true)
  const isMockMode = false; 

  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FollowUserInfo | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 1️⃣ [실제 API 모드]
  const {
    data: apiData,
    isLoading: isApiLoading, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteFollowers(userId, 10); 

  const { followMutation, unfollowMutation } = useFollowAction();

  // 2️⃣ [목업 모드 전용 상태]
  const [mockList, setMockList] = useState<FollowUserInfo[]>([]);
  const [isMockLoading, setIsMockLoading] = useState(false);

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 통합 제어
  // ==========================================================

  const followerList = useMemo(() => {
    // isMockMode가 false이므로 apiData를 우선시합니다.
    if (isMockMode) return mockList;
    return apiData?.pages.flatMap(page => page.data?.data ?? []) ?? [];
  }, [isMockMode, mockList, apiData]);

  const loadMockData = useCallback(() => {
    setIsMockLoading(true);
    setTimeout(() => {
      // 🟢 MOCK_FOLLOWERS_RESPONSE.data가 null일 수 있으므로 방어 코드 적용
      const mockDataArr = MOCK_FOLLOWERS_RESPONSE?.data?.data ?? [];
      setMockList(mockDataArr);
      setIsMockLoading(false);
    }, 500);
  }, []);

  const handleFetchNext = useCallback(() => {
    if (isMockMode) return; 
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isMockMode, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ==========================================================
  // 🟢 [SECTION 2] 무한 스크롤 & 초기화
  // ==========================================================

  useEffect(() => {
    if (isOpen && isMockMode) loadMockData();
    if (isOpen) setSearchTerm("");
  }, [isOpen, isMockMode, loadMockData]);

  useEffect(() => {
    // API 모드일 때 무한 스크롤 작동
    if (!isOpen || isMockMode || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && handleFetchNext(), 
      { root: scrollRef.current, threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, isMockMode, handleFetchNext]);

  // ==========================================================
  // 🟢 [SECTION 3] 핸들러
  // ==========================================================

  const handleToggleFollow = (targetUserId: number) => {
    const target = followerList.find(u => u.userId === targetUserId);
    if (!target) return;

    if (target.isFollowing) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    } else {
      if (isMockMode) {
        setMockList(prev => prev.map(u => u.userId === targetUserId ? { ...u, isFollowing: true } : u));
      } else {
        followMutation.mutate(targetUserId);
      }
    }
  };

  const confirmUnfollow = (uid: number) => {
    if (isMockMode) {
      setMockList(prev => prev.map(u => u.userId === uid ? { ...u, isFollowing: false } : u));
      setIsConfirmOpen(false);
    } else {
      unfollowMutation.mutate(uid, { onSuccess: () => setIsConfirmOpen(false) });
    }
  };

  const filteredList = useMemo(() => 
    followerList.filter(u => u.nickname.toLowerCase().includes(searchTerm.toLowerCase())), 
    [followerList, searchTerm]
  );

  // 로딩 상태 통합
  const isLoading = isMockMode ? isMockLoading : isApiLoading;

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title={`팔로워 ${isMockMode ? '(MOCK)' : ''}`} />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="팔로워 검색" customSize="large" />
          </div>

          <div ref={scrollRef} className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar">
            {isLoading ? (
              <div className="py-20 text-center label-xlarge text-on-surface-variant animate-pulse">목록을 불러오는 중...</div>
            ) : (
              <>
                <FollowerListSection users={filteredList} onToggle={handleToggleFollow} />
                <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
                  {!isMockMode && isFetchingNextPage && (
                    <span className="text-label-small text-on-surface-variant-lowest animate-pulse">불러오는 중...</span>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body><p className="text-center py-4 font-bold">{selectedUser?.nickname}님을 팔로우 해제 하시겠습니까?</p></Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-4 w-full">
            <Button variant="primary" shape="square" widthMode="fixed" width="150px" onClick={() => setIsConfirmOpen(false)}>취소</Button>
            <Button 
              variant="secondary" 
              shape="square"
              widthMode="fixed" 
              width="150px" 
              textClassName="label-xlarge-emphasized"
              onClick={() => selectedUser && confirmUnfollow(selectedUser.userId)}
            >
              팔로우 해제
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowerModal;