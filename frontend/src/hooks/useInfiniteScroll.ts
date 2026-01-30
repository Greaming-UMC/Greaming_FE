import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isLoading: boolean;
  threshold?: number;   // 감지 민감도 (0.0 ~ 1.0)
  rootMargin?: string;  // 감지 영역 확장
}

export const useInfiniteScroll = (
  onLoadMore: () => void,
  { hasNextPage, isLoading, threshold = 0.5, rootMargin = '100px' }: UseInfiniteScrollOptions
) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = observerRef.current;
    
    // 로딩 중이거나 더 이상 페이지가 없으면 관찰하지 않음
    if (!element || isLoading || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 화면에 들어왔고(isIntersecting), 로딩 중이 아닐 때
        if (entries[0].isIntersecting && !isLoading) {
          onLoadMore();
        }
      },
      { 
        threshold, 
        rootMargin // 바닥에 닿기 100px 전부터 로딩 시작
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [onLoadMore, hasNextPage, isLoading, threshold, rootMargin]);

  return observerRef;
};