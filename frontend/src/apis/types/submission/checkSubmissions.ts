import type { CheckSubmissionType, SortBy, SubmissionMetadata } from '../common';

/**
 * 홈화면 게시물 조회 (GET /api/submissions)
 * URI: /api/submissions
 */

// Request
export interface CheckSubmissionsRequest {
    type?: CheckSubmissionType;
    sort?: SortBy | null;
    page?: number | null;
    size?: number | null;
};

// Response
export interface CheckSubmissionsResponse {
    submission_list : SubmissionMetadata[];
};
