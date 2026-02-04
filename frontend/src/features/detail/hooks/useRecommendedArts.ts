import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getRecommendedArts } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type {
  GetRecommendedArtsResult,
  RecommendedArt,
} from "../../../apis/types/art";

export const useRecommendedArts = (artId: number) => {
  // 1. React Query를 사용한 무한 스크롤 데이터 페칭
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<
    ApiResultResponse<GetRecommendedArtsResult>,
    Error,
    InfiniteData<GetRecommendedArtsResult>,
    [string, number],
    number
  >({
    queryKey: ["recommendedArts", artId],
    queryFn: ({ pageParam = 1 }) =>
      getRecommendedArts(artId, { page: pageParam, size: 8 }),
    enabled: !!artId, // artId가 있을 때만 쿼리 실행
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.isSuccess ? lastPage.result?.nextPage : undefined,
    select: (data) => {
      const pages = data.pages.map((page) => {
        if (!page.isSuccess || !page.result) {
          throw new Error(`${page.code}: ${page.message}`);
        }
        return page.result;
      });
      return { pages, pageParams: data.pageParams };
    },
  });

  // 2. 뷰포트 감지를 위한 Intersection Observer
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // 3. 뷰포트 감지 시 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 4. 컴포넌트에서 사용하기 쉽게 데이터 가공
  const artworks: RecommendedArt[] = data?.pages.flatMap((page) => page.items) ?? [];

  return {
    artworks,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    bottomRef: ref, // 컴포넌트에서 감지할 요소에 달아줄 ref
  };
};
