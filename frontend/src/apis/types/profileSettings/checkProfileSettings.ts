import type { ProfileSettings } from '../common';
/**
 * 초기에 프로필 설정 화면 조회 (GET /api/users/me/profile)
 * URI: /api/users/me/profile
 */


// Response
export type ProfileSettingsResult = {
    profileSettings: ProfileSettings;
}