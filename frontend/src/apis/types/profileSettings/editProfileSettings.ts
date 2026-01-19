import type { ProfileSettings } from "../common";
/**
 * 프로필 설정 수정   (PUT /api/users/me/profile)
 * URI: /api/users/me/profile
 */


// Response
export type EditProfileSettingsResult = {
    profileSettings: ProfileSettings;
}