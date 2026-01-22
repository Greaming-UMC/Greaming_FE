import type { VisibilityType } from "../common";

/**
 * 계정 설정 조회 (GET /api/users/me/account)
 * URI: /api/users/me/account
 */


// Response
// ApiResultSuccessResponse<CheckSettingsResult>
export type CheckSettingsResult = {
    email: string,
    visibility: VisibilityType,
    loginType: string;
};