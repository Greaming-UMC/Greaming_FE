import { http } from "../../../libs/http/client";

import type { ApiResultResponse } from "../../../apis/types/common";
import type { SubmissionDetails } from "../../../apis/types/submission/checkSubmissionDetails";
import type {
  GetRecommendedArtsRequest,
  GetRecommendedArtsResult,
} from "../../../apis/types/art";

/**
 * 작품 상세 정보 조회
 * @param submissionId - 조회할 작품의 ID
 */
export const getSubmissionDetails = async (submissionId: number) => {
  const { data } = await http.get<ApiResultResponse<SubmissionDetails>>(
    `/submissions/${submissionId}`,
  );
  return data;
};

/**
 * 연관 추천 작품 목록 조회 (무한 스크롤)
 * @param artId - 추천의 기준이 될 작품의 ID
 * @param params - 페이지네이션 파라미터 (page, size)
 */
export const getRecommendedArts = async (
  artId: number,
  params: GetRecommendedArtsRequest,
) => {
  const { data } = await http.get<ApiResultResponse<GetRecommendedArtsResult>>(
    `/arts/${artId}/recommendations`, // TODO: 실제 API 엔드포인트로 수정해주세요.
    { params },
  );
  return data;
};