import type { ProfileInterceptor } from '../common';

/**
 * 유저 프로필정보 (GET /api/user/{userId}/info)
 * URI: /api/user/{userId}/info
 */


// Response
// ApiResultSuccessResponse<CheckUserProfileResult>
export type CheckUserProfileResult = ProfileInterceptor;
