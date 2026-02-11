import type { CheckSubmissionType, SortBy, SubmissionListItemDto, PageInfo } from "../common";

/**
 * 홈화면 게시물 조회 (GET /api/submissions)
 * URI: /api/submissions
 */
export interface CheckSubmissionsRequest {
  type?: CheckSubmissionType;
  sortBy?: SortBy | null;
  page?: number | null;
  size?: number | null;
}

export interface CheckSubmissionsResult {
  submissions: SubmissionListItemDto[];
  pageInfo: PageInfo;
}
