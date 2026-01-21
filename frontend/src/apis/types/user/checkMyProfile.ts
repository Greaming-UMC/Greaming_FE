import type { ProfileInterceptor } from '../common';

/**
 * 내 프로필 정보 (GET /api/users/me)
 * URI: /api/users/me
 */


// Response
// ApiResultSuccessResponse<CheckMyProfileResult>
export type CheckMyProfileResult = ProfileInterceptor;
