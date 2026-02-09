/**
 * 프로필 설정 관련 쿼리 키 정의
 */
export const PROFILE_SETTING_KEYS = {
  all: ['profile-settings'] as const,
  myProfile: () => [...PROFILE_SETTING_KEYS.all, 'me'] as const,
};