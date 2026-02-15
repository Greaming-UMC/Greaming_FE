import { useQuery } from "@tanstack/react-query";
import { getRecommendedSubmissions } from "../../api/api";

/**
 * 추천 게시물 목록을 조회하는 Query Hook
 * @param page - 페이지 번호 (기본값: 1)
 * @param size - 조회할 게시물 수 (기본값: 8)
 * @returns 추천 게시물 목록, 로딩 상태, 에러
 */
export const useRecommendedSubmissions = (
  page: number = 1,
  size: number = 8,
) => {
  return useQuery({
    queryKey: ["recommendedSubmissions", page, size],
    queryFn: () =>
      getRecommendedSubmissions({
        page,
        size,
        sortBy: "recommend",
      }),
    staleTime: 3 * 60 * 1000, // 3분간 fresh 상태 유지 (추천은 자주 변경될 수 있음)
  });
};
