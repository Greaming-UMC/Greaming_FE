import { redirectToSocialLogin } from "../api/api";
import type { SocialProvider } from "../config/types";

export const useSocialLogin = () => {
  const startSocialLogin = (provider: SocialProvider) => {
    redirectToSocialLogin(provider);
  };

  return { startSocialLogin };
};