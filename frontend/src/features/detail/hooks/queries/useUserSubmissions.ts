import { useQuery } from "@tanstack/react-query";
import { getUserSubmissions } from "../../api/api";

/**
 * 특정 사용자의 게시물 목록을 조회하는 Query Hook
 * @param userId - 조회할 사용자 ID
 * @param size - 조회할 게시물 수 (기본값: 10)
 * @returns 사용자 게시물 목록, 로딩 상태, 에러
 */
export const useUserSubmissions = (userId?: number, size: number = 10) => {
  return useQuery({
    queryKey: ["userSubmissions", userId, size],
    queryFn: () => getUserSubmissions(userId!, { size }),
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
  });
};
