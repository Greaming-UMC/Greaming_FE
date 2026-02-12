import type { CommentDetail } from "./checkSubmissionDetails";

/**
 * GET /api/submissions/{submissionId}/comments
 * 작품의 댓글 목록을 페이지네이션으로 조회
 */

// Request
export interface GetSubmissionCommentsRequest {
  page?: number;
}

// Response
export interface PageInfo {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  isFirst: boolean;
}

export interface GetSubmissionCommentsResult {
  comments: CommentDetail[];
  pageInfo: PageInfo;
}