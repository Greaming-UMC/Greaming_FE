import { httpRefresh } from "../../../libs/http/refreshClient";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import { clearAccessToken, getAccessToken, setAccessToken } from "../../../libs/security/tokenStore";
import { extractAccessTokenFromReissueResponse } from "../../../libs/security/reissueToken";

/**
 * 리프레시 쿠키 기반 인증 확인 (POST /api/auth/reissue)
 * URI: /api/auth/reissue
 */
export type AuthCheckResult = boolean;

export const checkAuthByReissue = async (): Promise<AuthCheckResult> => {
  const res = await httpRefresh.post(ENDPOINTS.AUTH.REISSUE_TOKEN);
  const nextToken = extractAccessTokenFromReissueResponse(res);
  if (!nextToken) {
    clearAccessToken();
    throw new Error("access token missing from reissue response");
  }

  setAccessToken(nextToken);
  if (!getAccessToken()) {
    throw new Error("invalid access token from reissue response");
  }

  return true;
};
