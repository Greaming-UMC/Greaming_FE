import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { SocialProvider } from "../config/types";

export const buildSocialLoginUrl = (provider: SocialProvider) => {
  const path = ENDPOINTS.AUTH.SOCIAL_LOGIN(provider); // /oauth2/authorization/{provider}
  const base = import.meta.env.VITE_API_BASE_URL;

  if (!base) return path;

  // base가 혹시 /api 같은 path를 포함해도 origin으로 정규화
  const origin = new URL(base).origin;
  return new URL(path, origin).toString();
};

export const redirectToSocialLogin = (provider: SocialProvider) => {
  const url = buildSocialLoginUrl(provider);
  window.location.assign(url);
};
