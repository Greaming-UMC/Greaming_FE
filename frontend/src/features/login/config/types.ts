export const SOCIAL_PROVIDERS = ["google", "kakao"] as const;

export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

export const PROVIDER_PATH: Record<SocialProvider, string> = {
  google: "google",
  kakao: "kakao",
};

export const isSocialProvider = (value: string): value is SocialProvider => {
  return (SOCIAL_PROVIDERS as readonly string[]).includes(value);
};
