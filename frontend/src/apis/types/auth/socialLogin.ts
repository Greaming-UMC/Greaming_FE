/**
 * 소셜 로그인 콜백을 진행하여 소셜 로그인 완료시 랜딩 페이지로 이동시키거나 메인 화면으로 바로 이동시킵니다. (GET /api/auth/login/social/{provider})
 * URI: /api/auth/login/social/{provider}
 */

// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type SocialResult = {
    expires_in: number;
    is_new_user: boolean;
};



/**
 * 로그아웃 (POST /api/auth/logout)
 * URI: /api/auth/logout
 */

// Response
// ./common.ts 에서 ApiResultResponse<null> 사용



/**
 * 엑세스 토큰 만료시 재발급을 지원합니다. (POST /api/auth/reissue)
 * URI: /api/auth/reissue
 */

// Response
// ./common.ts 에서 ApiResultResponse<null> 사용