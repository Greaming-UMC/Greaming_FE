/**
 * 소셜 로그인 콜백을 진행하여 소셜 로그인 완료시 랜딩 페이지로 이동시키거나 메인 화면으로 바로 이동시킵니다. (GET /api/auth/login/social/{provider})
 * URI: /api/auth/login/social/{provider}
 */

// Response
export type SocialResult = {
    expires_in: number;
    is_new_user: boolean;
}
