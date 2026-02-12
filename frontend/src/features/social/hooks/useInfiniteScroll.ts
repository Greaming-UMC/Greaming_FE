import { useInfiniteQuery } from '@tanstack/react-query';
import type { ApiDataSuccessResponse, ApiErrorResponse } from '../../../apis/types/common';

/**
 * [공용 무한 스크롤 훅]
 * T: API 응답의 실제 데이터 타입 (hasNext, nextCursor 포함 필수)
 */
export const useInfiniteScroll = <T extends { hasNext: boolean; nextCursor: string | number | null }>(
  queryKey: unknown[],
  fetchFn: (params: { cursorId: number | null; size: number }) => Promise<ApiDataSuccessResponse<T>>,
  size: number = 10,
  enabled: boolean = true
) => {
  return useInfiniteQuery<ApiDataSuccessResponse<T>, ApiErrorResponse>({
    queryKey,
    queryFn: ({ pageParam = null }) => fetchFn({ cursorId: pageParam as number | null, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      // Family A 규격에 따라 lastPage.data 내부의 페이징 정보 확인
      if (!lastPage.data?.hasNext || lastPage.data.nextCursor === null) return undefined;
      return lastPage.data.nextCursor;
    },
    enabled,
  });
};