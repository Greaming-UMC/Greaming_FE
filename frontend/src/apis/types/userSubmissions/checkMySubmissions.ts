import type { CheckSubmissionInterceptor, SubmissionMetadata } from '../common';

/**
 * 내 다음 페이지 제출물 조회 (GET /api/users/me/submissions)
 * URI: /api/users/me/submissions
 */

// Request
export type CheckMySubmissionsRequest = CheckSubmissionInterceptor;


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type CheckMySubmissionsResult = {
    submission_list: SubmissionMetadata[];
};
