import type { CircleSubmissionMetadata } from "../common";

/**
 * 써클원 다음 페이지 작품들 조회 (GET /api/circles/{circleId}/submissions)
 * URI: /api/circles/{circleId}/submissions
 */

// Request
export interface CheckCircleSubmissionsRequest {
    page?: number | null;
    size?: number | null;
};


// Response
export type CheckCircleSubmissionsResponse = {
    circle_list: CircleSubmissionMetadata[];
};