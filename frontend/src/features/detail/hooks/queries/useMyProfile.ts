import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../api/api";

/**
 * 현재 로그인한 사용자의 프로필 정보를 조회하는 Query Hook
 * @returns 사용자 프로필 데이터, 로딩 상태, 에러
 */
export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
    staleTime: 10 * 60 * 1000, // 10분간 fresh 상태 유지 (프로필은 자주 변경되지 않음)
    gcTime: 30 * 60 * 1000, // 30분간 캐시 유지
  });
};
