import { refreshAccessTokenNow } from "../../../libs/security/refreshManeger";

/**
 * 리프레시 쿠키 기반 인증 확인 (POST /api/auth/reissue)
 * URI: /api/auth/reissue
 */
export type AuthCheckResult = boolean;

export const checkAuthByReissue = async (): Promise<AuthCheckResult> => {
  await refreshAccessTokenNow("auth-check");
  return true;
};
