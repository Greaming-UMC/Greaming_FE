import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import FollowerListSection from './sections/FollowerListSection';

import { useInfiniteFollowers, useFollowAction } from '../hooks/useSocial';
// 🟢 FollowListUserResponse 대신 실제 응답 구조 타입이 있다면 그것을 사용하거나 아래처럼 단언합니다.
import type { FollowUserInfo, FollowListUserResponse } from '../../../apis/types/common';

interface FollowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const FollowerModal = ({ isOpen, onClose, userId }: FollowerModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FollowUserInfo | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: apiData,
    isLoading: isApiLoading, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteFollowers(userId, isOpen, 10); 

  const { followMutation, unfollowMutation } = useFollowAction();

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 매핑 수정
  // ==========================================================
  const followerList = useMemo(() => {
    // 💡 에러 해결: apiData.pages[0]에 result가 없다면 data.data 혹은 result.users 확인
    // 스웨거 구조(image_1f78cc.png)에 맞게 경로를 조정합니다.
    const rawUsers = apiData?.pages.flatMap(page => {
      // @ts-ignore: 타입 불일치 에러 방지용 (실제 런타임 구조인 result.users 우선 참조)
      return page.result?.users ?? (page as any).data?.users ?? [];
    }) ?? [];

    return rawUsers.map((user: any): FollowUserInfo => ({
      userId: user.userId,
      nickname: user.nickname,
      profileImgUrl: user.profileImgUrl ?? '',
      journeyLevel: user.journeyLevel, 
      // 🟢 서버 필드 'following'을 'isFollowing'으로 매핑
      isFollowing: user.following,
      followState: 'COMPLETED',
      // 🟢 디자인 시안용 specialtyTags 강제 주입
      ...({ specialtyTags: user.specialtyTags } as any)
    }));
  }, [apiData]);

  const handleFetchNext = useCallback(() => {
    if (!isOpen) return; 
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isOpen, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ==========================================================
  // 🟢 [SECTION 2] 무한 스크롤 & 핸들러
  // ==========================================================
  useEffect(() => {
    if (isOpen) setSearchTerm("");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) handleFetchNext();
      }, 
      { root: scrollRef.current, threshold: 0.1 } 
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext]);

  const handleToggleFollow = (targetUserId: number) => {
    const target = followerList.find(u => u.userId === targetUserId);
    if (!target) return;

    if (target.isFollowing) {
      setSelectedUser(target);
      setIsConfirmOpen(true);
    } else {
      followMutation.mutate(targetUserId);
    }
  };

  const confirmUnfollow = (uid: number) => {
    unfollowMutation.mutate(uid, { 
      onSuccess: () => setIsConfirmOpen(false) 
    });
  };

  const filteredList = useMemo(() => 
    followerList.filter(u => u.nickname.toLowerCase().includes(searchTerm.toLowerCase())), 
    [followerList, searchTerm]
  );

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="팔로워" />
        <Modal.Body>
          <div className="mb-4 px-2">
            <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="팔로워 검색" customSize="large" />
          </div>

          <div ref={scrollRef} className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar">
            {isApiLoading ? (
              <div className="py-20 text-center label-xlarge animate-pulse">목록을 불러오는 중...</div>
            ) : (
              <>
                <FollowerListSection users={filteredList} onToggle={handleToggleFollow} />
                <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
                  {hasNextPage && isFetchingNextPage && (
                    <span className="text-label-small animate-pulse">불러오는 중...</span>
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
          <p className="text-center py-4 font-bold">
            {selectedUser?.nickname}님을 팔로우 해제 하시겠습니까?
          </p>
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