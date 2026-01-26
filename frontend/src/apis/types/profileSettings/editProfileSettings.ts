import type { UserInformations } from "../common";
/**
 * 프로필 설정 수정   (PUT /api/users/me/profile)
 * URI: /api/users/me/profile
 */

// Request
export type EditProfileSettingsParams = UserInformations;


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type EditProfileSettingsResult = {
    user_information: UserInformations;
};
