  import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
  import { Button, Modal, SearchField } from '../../../components/common';
  import type { SocialUserItem } from '../types';
  import FollowerListSection from './sections/FollowerListSection';

  /** 🛠️ [MODE A] 목업 데이터 */
  import { MOCK_FOLLOWER_LIST } from '../testing/mockdata'; 

  interface FollowerModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
  }

  const FollowerModal = ({ isOpen, onClose, userId }: FollowerModalProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SocialUserItem | null>(null);

    // 🟢 스크롤 컨테이너와 감지 타겟 Ref
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // ==========================================================
    // 🟢 [SECTION 1] 데이터 제어 섹션
    // ==========================================================
    const [followerList, setFollowerList] = useState<SocialUserItem[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
    
    const pageSize = 10;
    // 데이터가 더 있는지 확인
    const hasNextPage = followerList.length < MOCK_FOLLOWER_LIST.length && searchTerm === "";

    // 데이터 페칭 함수
    const fetchMockData = useCallback((pageNum: number, isNext: boolean = false) => {
      if (isNext) setIsFetchingNextPage(true);
      else setIsLoading(true);

      setTimeout(() => {
        const end = pageNum * pageSize;
        const slicedData = MOCK_FOLLOWER_LIST.slice(0, end);
        
        setFollowerList(slicedData);
        setIsLoading(false);
        setIsFetchingNextPage(false);
      }, 300);
    }, []);

    // 바닥에 닿았을 때 실행할 함수
    const handleFetchNext = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage && !isLoading) {
        setPage(prev => prev + 1);
      }
    }, [hasNextPage, isFetchingNextPage, isLoading]);

    // ==========================================================
    // 🟢 [SECTION 2] 자동 스크롤 감지 (Intersection Observer)
    // ==========================================================
    useEffect(() => {
      if (!isOpen || !loadMoreRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleFetchNext();
          }
        },
        { 
          root: scrollRef.current, // 모달 내부 스크롤 박스 기준
          threshold: 0.1 
        }
      );

      observer.observe(loadMoreRef.current);
      return () => observer.disconnect();
    }, [isOpen, handleFetchNext]);

    // ==========================================================
    // 🟢 [SECTION 3] 핸들러 및 이펙트
    // ==========================================================

    // 모달이 열릴 때 초기화
    useEffect(() => {
      if (isOpen) {
        setPage(1);
        setSearchTerm("");
        fetchMockData(1, false);
      }
    }, [isOpen, userId]); 

    // 페이지가 변경될 때마다 데이터를 추가로 가져옴
    useEffect(() => {
      if (page > 1 && isOpen) {
        fetchMockData(page, true);
      }
    }, [page, isOpen]);

    const handleToggleFollow = (userId: number) => {
      const targetUser = followerList.find(u => u.userId === userId);
      if (!targetUser) return;

      if (targetUser.isFollowing) {
        setSelectedUser(targetUser);
        setIsConfirmOpen(true);
      } else {
        setFollowerList(prev => 
          prev.map(u => u.userId === userId ? { ...u, isFollowing: true } : u)
        );
      }
    };

    const updateFollowStatus = (userId: number) => {
      setFollowerList(prev => 
        prev.map(u => u.userId === userId ? { ...u, isFollowing: false } : u)
      );
      setIsConfirmOpen(false);
    };

    const filteredList = useMemo(() => {
      return followerList.filter(u => 
        u.nickname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [followerList, searchTerm]);

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
              />
            </div>

            {/* 리스트 스크롤 영역 */}
            <div 
              ref={scrollRef}
              className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar"
            >
              {isLoading && page === 1 ? (
                <div className="py-20 text-center label-xlarge text-on-surface-variant">데이터를 불러오는 중...</div>
              ) : (
                <>
                  <FollowerListSection users={filteredList} onToggle={handleToggleFollow} />
                  
                  {/* 🟢 자동 감지 타겟 (상시 렌더링하여 관찰 끊김 방지) */}
                  <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
                    {isFetchingNextPage && (
                      <span className="text-label-small text-on-surface-variant-lowest">
                        추가 목록 불러오는 중...
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>

        {/* 팔로우 해제 컨펌 모달 */}
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
