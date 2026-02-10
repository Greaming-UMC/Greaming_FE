import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import CircleMemberListSection from './sections/CircleMemberListSection';

// 🟢 훅 파일에 정의된 실제 이름인 'useCircleMembers'로 수정
import { useCircleMembers, useFollowAction } from '../hooks/useSocial';
import type { CheckCircleMemberInfo } from '../../../apis/types/common'; 

interface CircleMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  circleId: number;
}

const CircleMemberModal = ({ isOpen, onClose, circleId }: CircleMemberModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 컨펌 모달 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CheckCircleMemberInfo | null>(null);

  // 🟢 훅 이름 통일 (useCircleMembers)
  // 현재 명세상 단발성 조회이므로 fetchNextPage 등은 내부적으로 undefined가 될 수 있음
  const { 
    data: apiData, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useCircleMembers(circleId);

  const { followMutation, unfollowMutation } = useFollowAction();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 🟢 무한 스크롤 핸들러 (추후 백엔드 페이징 지원 대비)
  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) handleFetchNext(); },
      { root: scrollRef.current, threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext]);

  // 🟢 데이터 가공 (Family B: .result.members 접근)
  const members = useMemo(() => {
    if (!apiData) return [];
    // useInfiniteQuery 구조이므로 pages 배열을 타고 들어갑니다.
    return apiData.pages.flatMap(page => page.result?.members ?? []);
  }, [apiData]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => 
      member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  // 🟢 팔로우/해제 핸들러
  const handleToggleFollow = (targetUserId: number) => {
    const target = members.find(m => m.userId === targetUserId);
    if (!target) return;

    if (target.isFollowing) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    } else {
      followMutation.mutate(targetUserId);
    }
  };

  const confirmUnfollow = (userId: number) => {
    unfollowMutation.mutate(userId, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        setSelectedUser(null);
      }
    });
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="써클 멤버" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="멤버 닉네임 검색" 
              customSize="large" 
            />
          </div>
          
          <div ref={scrollRef} className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar">
            {isLoading ? (
              <div className="py-20 text-center label-xlarge text-on-surface-variant">
                멤버 목록을 불러오는 중...
              </div>
            ) : (
              <CircleMemberListSection 
                members={filteredMembers} 
                onToggleFollow={handleToggleFollow}
                loadMoreRef={loadMoreRef}
                isFetchingNextPage={isFetchingNextPage}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* 팔로우 해제 확인 컨펌 */}
      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="팔로우 해제" />
        <Modal.Body>
          <div className="text-center py-4">
            <span className="font-bold">{selectedUser?.nickname}</span>님을 팔로우 해제 하시겠습니까?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-center gap-[16px] w-full">
            <Button 
              variant="primary" 
              shape="square" 
              widthMode="fixed" 
              width="150px" 
              onClick={() => setIsConfirmOpen(false)}
            >
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