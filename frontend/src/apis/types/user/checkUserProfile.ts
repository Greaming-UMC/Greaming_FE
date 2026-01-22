import type { ProfileInterceptor } from '../common';

/**
 * 유저 프로필정보 (GET /api/users/{userId})
 * URI: /api/users/{userId}
 */


// Response
// ApiResultSuccessResponse<CheckUserProfileResult>
export type CheckUserProfileResult = ProfileInterceptor;
