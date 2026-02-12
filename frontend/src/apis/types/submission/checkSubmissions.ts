import type { CheckSubmissionType, SortBy, SubmissionListItemDto, PageInfo } from "../common";

/*
 * 전체 게시물 조회 - 홈 화면 (GET /api/submissions)
 * URI: /api/submissions
 */

export interface CheckSubmissionsRequest {
  type?: CheckSubmissionType;
  sortBy?: SortBy | null;
  tags?: string[] | null;
  page?: number | null;
  size?: number | null;
}

export interface CheckSubmissionsResult {
  submissions: SubmissionListItemDto[];
  pageInfo: PageInfo;
}
