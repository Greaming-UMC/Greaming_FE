import type { ProfileInterceptor } from '../common';

/**
 * 현재 로그인한 유저의 프로필 정보 조회 (GET /api/users/me)
 * URI: /api/users/me
 */

// Response
// ApiResultResponse<GetMyProfileResult>
export type GetMyProfileResult = ProfileInterceptor;
