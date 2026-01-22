import type { userInformations } from "../common";
/**
 * 프로필 설정 수정   (PUT /api/users/me/profile)
 * URI: /api/users/me/profile
 */

// Request
export type EditProfileSettingsParams = userInformations;


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type EditProfileSettingsResult = {
    user_information: userInformations;
};