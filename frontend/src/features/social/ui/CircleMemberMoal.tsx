import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common'; // Button 추가
import CircleMemberListSection from './sections/CircleMemberListSection';
import { useInfiniteCircleMembers, useFollowAction } from '../hooks/useSocial';
import type { CircleMemberItem } from '../types';
import { MOCK_CIRCLE_MEMBER_LIST } from '../testing/mockdata';

interface CircleMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: number;
}

const CircleMemberModal = ({ isOpen, onClose, circleId }: CircleMemberModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isApiMode = false;

  // 🟢 [추가] 컨펌 모달 관련 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CircleMemberItem | null>(null);

  const [mockMembers, setMockMembers] = useState<CircleMemberItem[]>([]);
  const [mockPage, setMockPage] = useState(1);
  const [isMockLoading, setIsMockLoading] = useState(false);
  const [isFetchingNextMock, setIsFetchingNextMock] = useState(false);
  const pageSize = 10;

  const { 
    data: apiData, isLoading: isApiLoading, fetchNextPage, hasNextPage, isFetchingNextPage 
  } = useInfiniteCircleMembers(circleId);
  const { followMutation, unfollowMutation } = useFollowAction();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ... (fetchMockData 및 Observer 로직 생략 - 기존과 동일) ...
  const fetchMockData = useCallback((page: number, isNext: boolean = false) => {
    if (isNext) setIsFetchingNextMock(true);
    else setIsMockLoading(true);
    setTimeout(() => {
      setMockMembers(MOCK_CIRCLE_MEMBER_LIST.slice(0, page * pageSize));
      setIsMockLoading(false);
      setIsFetchingNextMock(false);
    }, 500);
  }, []);

  const handleFetchNext = useCallback(() => {
    if (isApiMode) {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    } else {
      if (mockMembers.length < MOCK_CIRCLE_MEMBER_LIST.length && !isFetchingNextMock) {
        setMockPage(prev => prev + 1);
      }
    }
  }, [isApiMode, hasNextPage, isFetchingNextPage, fetchNextPage, mockMembers.length, isFetchingNextMock]);

  useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) handleFetchNext(); }, { root: scrollRef.current, threshold: 0.1 });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext]);

  useEffect(() => {
    if (isOpen && !isApiMode) { setMockPage(1); setSearchTerm(""); fetchMockData(1, false); }
  }, [isOpen, isApiMode, fetchMockData]);

  useEffect(() => {
    if (mockPage > 1 && !isApiMode) fetchMockData(mockPage, true);
  }, [mockPage, isApiMode, fetchMockData]);

  const members = useMemo(() => {
    if (isApiMode) return apiData?.pages.flatMap(p => p.data?.members ?? []) ?? [];
    return mockMembers;
  }, [isApiMode, apiData, mockMembers]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => member.nickname.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [members, searchTerm]);

  // ==========================================================
  // 🟢 [SECTION 4] 핸들러 수정 (컨펌 모달 연결)
  // ==========================================================

  const handleToggleFollow = (targetUserId: number) => {
    const target = members.find(m => m.userId === targetUserId);
    if (!target) return;

    // 1. 이미 팔로잉 중이라면? 해제 컨펌 모달 띄우기
    if (target.isFollowing) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    } 
    // 2. 팔로우 중이 아니라면? 즉시 팔로우 실행
    else {
      if (isApiMode) {
        followMutation.mutate(targetUserId);
      } else {
        setMockMembers(prev => prev.map(m => m.userId === targetUserId ? { ...m, isFollowing: true } : m));
      }
    }
  };

  /** 컨펌 모달에서 최종 '해제' 클릭 시 */
  const confirmUnfollow = (userId: number) => {
    if (isApiMode) {
      unfollowMutation.mutate(userId);
    } else {
      setMockMembers(prev => prev.map(m => m.userId === userId ? { ...m, isFollowing: false } : m));
    }
    setIsConfirmOpen(false);
  };

  const isLoading = isApiMode ? isApiLoading : isMockLoading;

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="써클 멤버" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="멤버 닉네임 검색" customSize="large" />
          </div>
          <div ref={scrollRef} className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar">
            {isLoading ? (
              <div className="py-20 text-center label-xlarge text-on-surface-variant">멤버 목록을 불러오는 중...</div>
            ) : (
              <CircleMemberListSection 
                members={filteredMembers} 
                onToggleFollow={handleToggleFollow}
                loadMoreRef={loadMoreRef}
                isFetchingNextPage={isApiMode ? isFetchingNextPage : isFetchingNextMock}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* 🟢 [추가] 팔로우 해제 컨펌 모달 */}
      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <p className="text-center py-4">
            <span className="font-bold">{selectedUser?.nickname}</span>님을 팔로우 해제 하시겠습니까?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button variant="primary" shape="square" widthMode="fixed" width="150px" onClick={() => setIsConfirmOpen(false)}>
              취소
            </Button>
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

export default CircleMemberModal;