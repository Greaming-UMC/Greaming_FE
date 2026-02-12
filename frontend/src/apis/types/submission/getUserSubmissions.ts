import type { PageInfo } from "./getSubmissionComments";

/**
 * GET /api/submissions/user/{userId}
 * 특정 유저의 게시글 목록을 페이지네이션으로 조회
 */

// Request
export interface GetUserSubmissionsRequest {
  page?: number;
  size?: number;
}

// Submission item in the list
export interface UserSubmission {
  submissionId: number;
  thumbnailUrl: string;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
}

// Response
export interface GetUserSubmissionsResult {
  submissions: UserSubmission[];
  pageInfo: PageInfo;
}