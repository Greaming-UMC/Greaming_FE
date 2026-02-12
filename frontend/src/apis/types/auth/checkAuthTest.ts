import { httpRefresh } from "../../../libs/http/refreshClient";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import { clearAccessToken, setAccessToken } from "../../../libs/security/tokenStore";

/**
 * 리프레시 쿠키 기반 인증 확인 (POST /api/auth/reissue)
 * URI: /api/auth/reissue
 */
export type AuthCheckResult = boolean;

export const checkAuthByReissue = async (): Promise<AuthCheckResult> => {
  const res = await httpRefresh.post(ENDPOINTS.AUTH.REISSUE_TOKEN);
  const authHeader = res.headers?.authorization ?? res.headers?.Authorization;

  if (typeof authHeader === "string") {
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const nextToken = (match?.[1] ?? authHeader).trim();
    if (nextToken) {
      setAccessToken(nextToken);
      return true;
    }
  }

  // 쿠키 기반 환경에선 Authorization 헤더가 없을 수 있으므로 실패로 보지 않습니다.
  clearAccessToken();
  return true;
};
