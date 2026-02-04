import { http } from "../../../libs/http/client";

import type { ApiResultResponse } from "../../../apis/types/common";
import type { SubmissionDetails } from "../../../apis/types/submission/checkSubmissionDetails";
import type {
  GetRecommendedArtsRequest,
  GetRecommendedArtsResult,
} from "../../../apis/types/art";
import type {
  GetUserWorksRequest,
  GetUserWorksResult,
} from "../../../apis/types/work";

/**
 * 작품 상세 정보 조회
 * @param workId - 조회할 작품의 ID
 */
export const getSubmissionDetails = async (workId: number) => {
  const { data } = await http.get<ApiResultResponse<SubmissionDetails>>(
    `/submissions/${workId}`,
  );
  return data;
};

/**
 * 해당 유저의 작품 목록 조회
 * @param memberId - 조회할 유저의 ID
 * @param body - 요청 바디 (type, page, size)
 */
export const getUserWorks = async (
  memberId: number,
  body: GetUserWorksRequest,
) => {
  const { data } = await http.post<ApiResultResponse<GetUserWorksResult>>(
    `/users/${memberId}/submissions`,
    body,
  );
  return data;
};

/**
 * 연관 추천 작품 목록 조회 (무한 스크롤)
 * @param artId - 추천의 기준이 될 작품의 ID
 * @param params - 페이지네이션 파라미터 (page, size)
 * 백엔드 구현이 될지 
 */
export const getRecommendedArts = async (
  artId: number,
  params: GetRecommendedArtsRequest,
) => {
  const { data } = await http.get<ApiResultResponse<GetRecommendedArtsResult>>(
    `/arts/${artId}/recommendations`, 
    { params },
  );
  return data;
};