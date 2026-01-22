import type { CheckSubmissionInterceptor, SubmissionMetadata } from '../common';

/**
 * 유저 다음 페이지 제출물 조회 (GET /api/users/{userId}/submissions)
 * URI: /api/users/{userId}/submissions
 */

// Request
export type CheckUserSubmissionsRequest = CheckSubmissionInterceptor;


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type CheckUserSubmissionsResult = {
    submission_list: SubmissionMetadata[];
};
