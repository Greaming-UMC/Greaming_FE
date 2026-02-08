import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { SocialProvider } from "../config/types";

export const buildSocialLoginUrl = (provider: SocialProvider) => {
  const path = ENDPOINTS.AUTH.SOCIAL_LOGIN(provider); // /api/auth/login/social/{provider}
  const base = import.meta.env.VITE_API_BASE_URL; // 예: http://13.124.68.142:8081

  if (!base) return path;
  return new URL(path, base).toString();
};

export const redirectToSocialLogin = (provider: SocialProvider) => {
  const url = buildSocialLoginUrl(provider);
  window.location.assign(url);
};
