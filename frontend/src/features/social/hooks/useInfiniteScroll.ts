import { useInfiniteQuery } from '@tanstack/react-query';
import type { ApiDataSuccessResponse, ApiErrorResponse } from '../../../apis/types/common';

/**
 * [공용 무한 스크롤 훅]
 * T: API 응답 data 필드의 타입
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
      const data = lastPage?.data;
      if (!data || !data.hasNext || data.nextCursor === null) return undefined;
      return data.nextCursor;
    },
    enabled,
    refetchOnWindowFocus: false, 
  });
};