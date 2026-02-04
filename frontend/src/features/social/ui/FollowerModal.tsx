import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { SocialUserItem } from '../types';
import FollowerListSection from './sections/FollowerListSection';

/** 🛠️ [MODE A] 목업 데이터 */
import { MOCK_FOLLOWER_LIST } from '../testing/mockdata'; 

/** 🌐 [MODE B] 실제 API (연결 시 주석 해제) */
// import { useInfiniteFollowers, useFollowAction } from '../hooks/useSocial';

interface FollowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const FollowerModal = ({ isOpen, onClose, userId }: FollowerModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SocialUserItem | null>(null);

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 제어 섹션
  // ==========================================================

  /** 🛠️ [MODE A] 목업 데이터 로직 */
  const [followerList, setFollowerList] = useState<SocialUserItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  
  const pageSize = 10;
  const hasNextPage = followerList.length < MOCK_FOLLOWER_LIST.length && searchTerm === "";
  const unfollowMutation = { isPending: false }; 

  const fetchMockData = useCallback((isNext: boolean = false) => {
    if (isNext) setIsFetchingNextPage(true);
    else setIsLoading(true);

    setTimeout(() => {
      const end = page * pageSize;
      // 🟢 포인트: 여기서는 어떤 필터링도 하지 않고 전체를 보여줍니다.
      const slicedData = MOCK_FOLLOWER_LIST.slice(0, end);
      setFollowerList(slicedData);
      setIsLoading(false);
      setIsFetchingNextPage(false);
    }, 300);
  }, [page]);

  const handleFetchNext = () => {
    if (hasNextPage && !isFetchingNextPage) setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (isOpen) {
      setPage(1);
      setSearchTerm("");
      fetchMockData(false);
    }
    // 🟢 닫힐 때 리스트를 제거하는 로직을 삭제했습니다. (팔로워는 유지되니까요)
  }, [isOpen]); 

  useEffect(() => {
    if (page > 1 && isOpen) fetchMockData(true);
  }, [page, isOpen, fetchMockData]);

  /** 🌐 [MODE B] 실제 API 섹션 */
  /*
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteFollowers(userId);
  const { followMutation, unfollowMutation } = useFollowAction();
  const followerList = useMemo(() => data?.pages.flatMap(p => p.data?.data ?? []) ?? [], [data]);
  const handleFetchNext = fetchNextPage;
  */

  // ==========================================================
  // 🟢 [SECTION 2] 공통 UI 및 핸들러
  // ==========================================================
  
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const onIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) handleFetchNext();
  }, [handleFetchNext]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.1 });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [onIntersect]);

  // 검색 필터링만 수행
  const filteredList = useMemo(() => {
    return followerList.filter(u => 
      u.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [followerList, searchTerm]);

  // 🟢 팔로우 상태 업데이트 (리스트에서 제거하지 않고 해당 항목만 변경)
  const updateFollowStatus = (userId: number) => {
    setFollowerList(prev => 
      prev.map(u => u.userId === userId ? { ...u, isFollowing: false } : u)
    );
    setIsConfirmOpen(false);
  };

  const handleToggleFollow = (userId: number) => {
    const targetUser = followerList.find(u => u.userId === userId);
    if (!targetUser) return;

    if (targetUser.isFollowing) {
      // 내가 이미 팔로잉 중이면 해제 컨펌창
      setSelectedUser(targetUser);
      setIsConfirmOpen(true);
    } else {
      // 팔로잉 중이 아니면 즉시 팔로우 처리
      setFollowerList(prev => 
        prev.map(u => u.userId === userId ? { ...u, isFollowing: true } : u)
      );
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="팔로워" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="검색" 
              customSize="large" 
              iconPosition="leading" 
            />
          </div>

          {isLoading ? (
            <div className="py-20 text-center label-xlarge">데이터를 불러오는 중...</div>
          ) : (
            <>
              <FollowerListSection users={filteredList} onToggle={handleToggleFollow} />
              
              <div ref={loadMoreRef} className="h-[20px] w-full" />
              
              {isFetchingNextPage && (
                <div className="text-center py-2 text-label-small text-gray-400">
                  추가 목록 불러오는 중...
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* 언팔로우 확인 컨펌 모달 */}
      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4">{selectedUser?.nickname}님을 팔로우 해제 하시겠습니까? </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="primary" shape="square" widthMode="fixed" width="150px" onClick={() => setIsConfirmOpen(false)}>취소</Button>
            <Button 
              variant="secondary" 
              shape="square" 
              widthMode="fixed" 
              width="150px" 
              textClassName="label-xlarge-emphasized"
              disabled={unfollowMutation.isPending}
              onClick={() => selectedUser && updateFollowStatus(selectedUser.userId)}
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