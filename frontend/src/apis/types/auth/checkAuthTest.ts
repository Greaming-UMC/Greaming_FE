import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";

/**
 * 인증 테스트 (GET /api/auth/test)
 * URI: /api/auth/test
 */
export type AuthTestResult = number;

export const checkAuthTest = async (): Promise<AuthTestResult> => {
  const { data } = await http.get<AuthTestResult>(ENDPOINTS.AUTH.TEST);
  return data;
};
