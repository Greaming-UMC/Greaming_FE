import type { ActionSubmissionInterceptor, ActionSubmissionsResult } from '../common';

/**
 * 게시물 수정 (PUT /api/users/me/submissions)
 * URI: /api/users/me/submissions
 */

// Request
export type EditSubmissionsRequest = ActionSubmissionInterceptor;

// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type EditSubmissionsResult = ActionSubmissionsResult;
