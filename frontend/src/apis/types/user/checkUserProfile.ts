import type { ProfileInterceptor } from '../common';

/**
 * 유저 프로필정보 (GET /api/users/{userId}/info)
 * URI: /api/users/{userId}/info
 */


// Response
// ApiResultSuccessResponse<CheckUserProfileResult>
export type CheckUserProfileResult = ProfileInterceptor;
