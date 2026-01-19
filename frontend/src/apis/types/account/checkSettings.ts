import type { Visibillty } from "../common";

/**
 * 계정 설정 조회 (PUT /api/users/me/account)
 * URI: /api/users/me/account
 */


// Response
export type CheckSettingsResult = {
    email: string,
    visibillty: Visibillty,
    loginType: string;
}