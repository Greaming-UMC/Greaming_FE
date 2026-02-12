import type { SubmissionMetadata } from "../common";

/**
 * 특정 유저 게시물 목록 조회 (GET /api/submissions/user/{userId})
 * URI: /api/submissions/user/{userId}
 */

// Request
export type CheckUserSubmissionsRequest = {
  page?: number | null;
  size?: number | null;
};

export type UserSubmissionItem = {
  submissionId: number;
  thumbnailUrl: string;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
};

export type UserSubmissionPageInfo = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  isFirst: boolean;
};

// Response
// `submission_list`는 기존 프론트 호환 필드(점진 이관용)
export type CheckUserSubmissionsResult = {
  submissions?: UserSubmissionItem[];
  pageInfo?: UserSubmissionPageInfo;
  submission_list?: SubmissionMetadata[];
};
