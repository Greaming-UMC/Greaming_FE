import type { UserInformations } from '../common';
/**
 * 초기에 프로필 설정 화면 조회 (GET /api/users/me/profile)
 * URI: /api/users/me/profile
 */


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type ProfileSettingsResult = {
    user_information: UserInformations;
};
