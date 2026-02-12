import type { PageInfo } from "./getSubmissionComments";

/**
 * GET /api/submissions (추천순)
 * 추천 게시물 목록을 페이지네이션으로 조회
 */

// Request
export interface GetRecommendedSubmissionsRequest {
  page?: number;
  size?: number;
  sortBy: "recommend";
}

// Submission item in the list
export interface RecommendedSubmission {
  submissionId: number;
  thumbnailUrl: string;
  userId: number;
  nickname: string;
  profileImageUrl: string;
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
}

// Response
export interface GetRecommendedSubmissionsResult {
  submissions: RecommendedSubmission[];
  pageInfo: PageInfo;
}