import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { Button, Modal, SearchField } from '../../../components/common';
import type { CircleItem } from '../types';
import CircleSearchSection from './sections/CircleSearchSection';
import CircleCreateModal from './CircleCreateModal';

/** 🛠️ [MODE A] 목업 데이터 */
import { MOCK_CIRCLE_LIST } from '../testing/mockdata'; 
import { useDebounce } from '../hooks/useDebounce';

/** 🌐 [MODE B] 실제 API (연결 시 주석 해제) */
// import { useInfiniteCircles, useCircleAction } from '../hooks/useCircle';

interface CircleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CircleSearchModal = ({ isOpen, onClose }: CircleSearchModalProps) => {
  // UI용 즉각적인 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 🟢 서버 요청용 디바운스 검색어 (0.5초 지연)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // ==========================================================
  // 🟢 [SECTION 1] 데이터 제어 섹션 (목업 모드)
  // ==========================================================

  const [circleList, setCircleList] = useState<CircleItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  
  const pageSize = 10;
  // 전체 목록 중 검색어에 맞는 것만 필터링한 데이터의 총 길이 계산 (hasNextPage용)
  const totalFilteredCount = MOCK_CIRCLE_LIST.filter(c => 
    c.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  ).length;
  
  const hasNextPage = circleList.length < totalFilteredCount;

  // 데이터 페칭 로직
  const fetchMockData = useCallback((isNext: boolean = false) => {
    if (isNext) setIsFetchingNextPage(true);
    else setIsLoading(true);

    setTimeout(() => {
      // 디바운스된 검색어로 필터링된 전체 리스트에서 슬라이싱
      const filteredAll = MOCK_CIRCLE_LIST.filter(c => 
        c.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      const end = page * pageSize;
      setCircleList(filteredAll.slice(0, end));
      
      setIsLoading(false);
      setIsFetchingNextPage(false);
    }, 400); // 실제 네트워크 체감을 위한 딜레이
  }, [page, debouncedSearchTerm]);

  const handleFetchNext = () => {
    if (hasNextPage && !isFetchingNextPage) setPage(prev => prev + 1);
  };

  // 🟢 디바운스 검색어나 모달 오픈 상태가 바뀔 때 리셋 후 페칭
  useEffect(() => {
    if (isOpen) {
      setPage(1);
      fetchMockData(false);
    }
  }, [debouncedSearchTerm, isOpen]);

  // 페이지가 바뀔 때만 추가 페칭
  useEffect(() => {
    if (page > 1 && isOpen) fetchMockData(true);
  }, [page, isOpen, fetchMockData]);

  // 목업 전용 상태 변경 핸들러
  const toggleCircleMock = (id: number) => {
    setCircleList(prev => prev.map(circle => 
      circle.circleId === id 
        ? { 
            ...circle, 
            isJoined: !circle.isJoined, 
            memberCount: circle.isJoined ? circle.memberCount - 1 : circle.memberCount + 1 
          } 
        : circle
    ));
  };

  /** 🌐 [MODE B] 실제 API 섹션 예시 */
  /*
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteCircles(debouncedSearchTerm);
  const circleList = useMemo(() => data?.pages.flatMap(p => p.data?.data ?? []) ?? [], [data]);
  const handleFetchNext = fetchNextPage;
  */

  // ==========================================================
  // 🟢 [SECTION 2] 무한 스크롤 & UI
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

  return (
    <>
      <Modal open={isOpen} onClose={onClose} variant="default">
        <Modal.Header title="써클 검색" />
        <Modal.Body>
          <div className="mb-4 px-2 flex items-center gap-2">
            <div className="flex-1">
              <SearchField
                value={searchTerm} // 사용자는 즉각적인 입력 확인
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

          {isLoading ? (
            <div className="py-20 text-center text-label-medium">데이터를 검색하는 중...</div>
          ) : (
            <>
              <CircleSearchSection 
                circles={circleList} 
                onToggle={toggleCircleMock} 
              />
              
              <div ref={loadMoreRef} className="h-[20px] w-full" />
              
              {isFetchingNextPage && (
                <div className="text-center py-2 text-label-small text-gray-400">
                  추가 결과 불러오는 중...
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>

      <CircleCreateModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </>
  );
};

export default CircleSearchModal;