import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";

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
import type {
  GetSubmissionCommentsRequest,
  GetSubmissionCommentsResult,
} from "../../../apis/types/submission/getSubmissionComments";
import type {
  CreateCommentRequest,
  CreateCommentResult,
} from "../../../apis/types/submission/createComment";
import type {
  GetCommentRepliesRequest,
  GetCommentRepliesResult,
} from "../../../apis/types/submission/getCommentReplies";
import type {
  CreateReplyRequest,
  CreateReplyResult,
} from "../../../apis/types/submission/createReply";
import type {
  ToggleLikeResult,
} from "../../../apis/types/submission/toggleLike";
import type {
  CheckIsMeResult
} from "../../../apis/types/user/checkIsMe";
import type {
  GetRecommendedSubmissionsRequest,
  GetRecommendedSubmissionsResult,
} from "../../../apis/types/submission/getRecommendedSubmissions";
import type {
  GetUserSubmissionsRequest,
  GetUserSubmissionsResult,
} from "../../../apis/types/submission/getUserSubmissions";
import type {
  GetMyProfileResult,
} from "../../../apis/types/user/getMyProfile";

/**
 * 현재 로그인한 유저의 프로필 정보 조회
 */
export const getMyProfile = async () => {
  const { data } = await http.get<ApiResultResponse<GetMyProfileResult>>(
    ENDPOINTS.USER.GET_MY_PROFILE_HEADER,
  );
  return data;
};

/**
 * 작품 상세 정보 조회
 * @param workId - 조회할 작품의 ID
 */
export const getSubmissionDetails = async (workId: number) => {
  const { data } = await http.get<ApiResultResponse<SubmissionDetails>>(
    ENDPOINTS.SUBMISSION.GET_SUBMISSION_DETAIL(workId),
  );
  return data;
};

/**
 * 추천 게시물 목록 조회 (페이지네이션)
 * @param params - 페이지네이션 및 정렬 파라미터 (page, size, sortBy)
 */
export const getRecommendedSubmissions = async (
  params: GetRecommendedSubmissionsRequest,
) => {
  const { data } = await http.get<
    ApiResultResponse<GetRecommendedSubmissionsResult>
  >(ENDPOINTS.SUBMISSION.GET_SUBMISSIONS, { params });
  return data;
};

/**
 * 특정 유저의 게시글 목록 조회
 * @param userId - 조회할 유저의 ID
 * @param params - 페이지네이션 파라미터 (page, size)
 */
export const getUserSubmissions = async (
  userId: number,
  params: GetUserSubmissionsRequest,
) => {
  const { data } = await http.get<
    ApiResultResponse<GetUserSubmissionsResult>
  >(ENDPOINTS.SUBMISSION.GET_USER_SUBMISSIONS(userId), { params });
  return data;
};

/**
 * 대상 유저가 본인인지 확인
 * @param targetUserId - 확인할 유저의 ID
 */
export const checkIsMe = async (targetUserId: number) => {
  const { data } = await http.get<ApiResultResponse<CheckIsMeResult>>(
    ENDPOINTS.USER.CHECK_IS_ME(targetUserId),
  );
  return data;
};

/**
 * 게시물 좋아요 토글
 * @param submissionId - 좋아요를 토글할 게시물 ID
 */
export const toggleSubmissionLike = async (submissionId: number) => {
  const { data } = await http.post<ApiResultResponse<ToggleLikeResult>>(
    ENDPOINTS.SUBMISSION.TOGGLE_LIKE(submissionId),
    {}, // POST 요청이지만 body는 비어있습니다.
  );
  return data;
};

/**
 * 답글 목록 조회
 * @param commentId - 부모 댓글 ID
 * @param params - 페이지네이션 파라미터 (page, size)
 */
export const getCommentReplies = async (
  commentId: number,
  params: GetCommentRepliesRequest,
) => {
  const { data } = await http.get<ApiResultResponse<GetCommentRepliesResult>>(
    ENDPOINTS.COMMENT.GET_COMMENT_REPLIES(commentId),
    { params },
  );
  return data;
};

/**
 * 답글 생성
 * @param commentId - 부모 댓글 ID
 * @param body - 답글 내용 (content)
 */
export const createReply = async (
  commentId: number,
  body: CreateReplyRequest,
) => {
  const { data } = await http.post<ApiResultResponse<CreateReplyResult>>(
    ENDPOINTS.COMMENT.CREATE_REPLY(commentId),
    body,
  );
  return data;
};

/**
 * 댓글 생성
 * @param body - 댓글 생성 요청 바디 (submissionId, content)
 */
export const createComment = async (body: CreateCommentRequest) => {
  const { data } = await http.post<ApiResultResponse<CreateCommentResult>>(
    ENDPOINTS.COMMENT.CREATE_COMMENT,
    body,
  );
  return data;
};

/**
 * 작품 댓글 페이지네이션 조회
 * @param submissionId - 작품 ID
 * @param params - 페이지네이션 파라미터 (page)
 */
export const getSubmissionComments = async (
  submissionId: number,
  params: GetSubmissionCommentsRequest,
) => {
  const { data } = await http.get<
    ApiResultResponse<GetSubmissionCommentsResult>
  >(ENDPOINTS.SUBMISSION.GET_SUBMISSION_COMMENTS(submissionId), { params });
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
    `/api/users/${memberId}/submissions`,
    body,
  );
  return data;
};
