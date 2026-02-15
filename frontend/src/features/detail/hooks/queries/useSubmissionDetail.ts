import { useQuery } from "@tanstack/react-query";
import { getSubmissionDetails } from "../../api/api";

/**
 * 게시물 상세 정보를 조회하는 Query Hook
 * @param submissionId - 게시물 ID
 * @returns 게시물 상세 데이터, 로딩 상태, 에러
 */
export const useSubmissionDetail = (submissionId: number) => {
  return useQuery({
    queryKey: ["submission", submissionId],
    queryFn: () => getSubmissionDetails(submissionId),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지 (구 cacheTime)
  });
};
