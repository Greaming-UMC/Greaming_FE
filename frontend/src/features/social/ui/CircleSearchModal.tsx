import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { CircleItem } from '../types';
import CircleSearchSection from './sections/CircleSearchSection';
import CircleCreateModal from './CircleCreateModal';

/** 🛠️ [MODE A] 목업 데이터 */
import { MOCK_CIRCLE_LIST } from '../testing/mockdata'; 
import { useDebounce } from '../hooks/useDebounce';

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
  const [selectedCircle, setSelectedCircle] = useState<CircleItem | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 제어 섹션
  // ==========================================================
  const [circleList, setCircleList] = useState<CircleItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  
  const pageSize = 10;
  
  const totalFilteredCount = useMemo(() => 
    MOCK_CIRCLE_LIST.filter(c => 
      c.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ).length
  , [debouncedSearchTerm]);
  
  const hasNextPage = circleList.length < totalFilteredCount;

  const fetchMockData = useCallback((pageNum: number, isNext: boolean = false) => {
    if (isNext) setIsFetchingNextPage(true);
    else setIsLoading(true);

    setTimeout(() => {
      const filteredAll = MOCK_CIRCLE_LIST.filter(c => 
        c.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      const end = pageNum * pageSize;
      setCircleList(filteredAll.slice(0, end));
      
      setIsLoading(false);
      setIsFetchingNextPage(false);
    }, 300);
  }, [debouncedSearchTerm]);

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [hasNextPage, isFetchingNextPage, isLoading]);

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
      { 
        root: scrollRef.current, 
        threshold: 0.1 
      }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isOpen, handleFetchNext]);

  // ==========================================================
  // 🟢 [SECTION 3] 이펙트 및 핸들러
  // ==========================================================

  useEffect(() => {
    if (isOpen) {
      setPage(1);
      fetchMockData(1, false);
    }
  }, [debouncedSearchTerm, isOpen, fetchMockData]);

  useEffect(() => {
    if (page > 1 && isOpen) {
      fetchMockData(page, true);
    }
  }, [page, isOpen, fetchMockData]);

  // 🟢 1. 리스트에서 가입 버튼 클릭 시 호출
  const handleJoinClick = (id: number) => {
    const target = circleList.find(c => c.circleId === id);
    if (target) {
      setSelectedCircle(target);
      setIsConfirmOpen(true); // 컨펌 모달 열기
    }
  };

  // 🟢 2. 컨펌 모달에서 최종 '가입하기' 클릭 시 호출
  const handleJoinConfirm = () => {
    if (!selectedCircle) return;

    console.log(`[CircleJoin] 가입 승인됨: ${selectedCircle.name} (ID: ${selectedCircle.circleId})`);

    setCircleList(prev => prev.map(circle => 
      circle.circleId === selectedCircle.circleId 
        ? { 
            ...circle, 
            isJoined: true, 
            memberCount: circle.memberCount + 1 
          } 
        : circle
    ));
    
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
            {isLoading && page === 1 ? (
              <div className="py-20 text-center text-label-medium text-on-surface-variant">데이터를 검색하는 중...</div>
            ) : (
              <>
                <CircleSearchSection 
                  circles={circleList} 
                  onToggle={handleJoinClick} // 👈 핸들러 교체
                />
                
                <div ref={loadMoreRef} className="h-[10px] w-full flex items-center justify-center">
                  {isFetchingNextPage && (
                    <span className="text-label-small text-on-surface-variant-lowest">
                      추가 결과 불러오는 중...
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      {/* 🟢 가입 확인 컨펌 모달 (FollowingModal과 동일한 스타일) */}
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