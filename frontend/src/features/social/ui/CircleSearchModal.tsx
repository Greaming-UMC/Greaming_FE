import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import CircleSearchSection from './sections/CircleSearchSection';
import CircleCreateModal from './CircleCreateModal';
import { useDebounce } from '../hooks/useDebounce';

// 🟢 실제 API 훅 및 타입 임포트
import { useInfiniteCircles } from '../hooks/useSocial';
import type { ExploreCircleInfo } from '../../../apis/types/common';

interface CircleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleSearchModal = ({ isOpen, onClose }: CircleSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // 🟢 모달 상태 관리
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<ExploreCircleInfo | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ==========================================================
  // 🟢 [SECTION 1] 실제 데이터 페칭 (React Query)
  // ==========================================================
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteCircles(debouncedSearchTerm, 10);

  // Family B 구조 대응: 모든 페이지의 result.circles를 하나로 합침
  const circleList = useMemo(() => {
    return data?.pages.flatMap((page) => page.result?.circles ?? []) ?? [];
  }, [data]);

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  // ==========================================================
  // 🟢 [SECTION 2] 무한 스크롤 감지 (Intersection Observer)
  // ==========================================================
  useEffect(() => {
    if (!isOpen || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleFetchNext();
        }
      },
      { root: scrollRef.current, threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext]);

  // ==========================================================
  // 🟢 [SECTION 3] 이벤트 핸들러
  // ==========================================================

  // 1. 리스트에서 가입 버튼 클릭 시 호출
  const handleJoinClick = (id: number) => {
    const target = circleList.find(c => c.circleId === id);
    if (target) {
      setSelectedCircle(target);
      setIsConfirmOpen(true); 
    }
  };

  // 2. 컨펌 모달에서 최종 '가입하기' 클릭 시 호출
  const handleJoinConfirm = () => {
    if (!selectedCircle) return;

    // TODO: 실제 가입 API Mutation 연동 (필요 시 useJoinCircle 훅 추가)
    console.log(`[CircleJoin] 가입 시도: ${selectedCircle.name}`);
    
    setIsConfirmOpen(false);
    setSelectedCircle(null);
  };

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="써클 검색" />
        <Modal.Body>
          <div className="mb-4 px-2 flex items-center gap-2 flex-shrink-0">
            <div className="flex-1">
              <SearchField
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="써클 이름을 입력하세요"
                customSize="large"
                iconPosition="leading"
              />
            </div>
            <Button 
              variant="onPrimary"
              size="xs"
              shape="round"
              widthMode="hug"
              textClassName="label-large-emphasized"
              onClick={() => setIsCreateModalOpen(true)}
            >
              만들기
            </Button>
          </div>

          <div 
            ref={scrollRef}
            className="max-h-[540px] overflow-y-auto px-1 custom-scrollbar"
          >
            {isLoading && !isFetchingNextPage ? (
              <div className="py-20 text-center text-label-medium text-on-surface-variant">
                써클을 찾는 중입니다...
              </div>
            ) : (
              <>
                <CircleSearchSection 
                  circles={circleList} 
                  onToggle={handleJoinClick} 
                />
                
                <div ref={loadMoreRef} className="h-[20px] w-full flex items-center justify-center">
                  {isFetchingNextPage && (
                    <span className="text-label-small text-on-surface-variant-lowest animate-pulse">
                      추가 써클 불러오는 중...
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* 가입 확인 컨펌 모달 */}
      <Modal variant="confirm" open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <Modal.Header title="써클 가입" />
        <Modal.Body>
          <p className="text-center py-4">
            <span className="font-bold">[{selectedCircle?.name}]</span> 써클에 가입하시겠습니까?
          </p>
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
              onClick={handleJoinConfirm}
            >
              가입하기
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <CircleCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
};

export default CircleSearchModal;