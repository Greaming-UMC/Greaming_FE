import { useQuery } from "@tanstack/react-query";
import { checkIsMe } from "../../api/api";

/**
 * 특정 사용자가 현재 로그인한 사용자인지 확인하는 Query Hook
 * @param userId - 확인할 사용자 ID
 * @returns 본인 여부 데이터, 로딩 상태, 에러
 */
export const useIsMe = (userId?: number) => {
  return useQuery({
    queryKey: ["isMe", userId],
    queryFn: () => checkIsMe(userId!),
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 10 * 60 * 1000, // 10분간 fresh 상태 유지
  });
};
