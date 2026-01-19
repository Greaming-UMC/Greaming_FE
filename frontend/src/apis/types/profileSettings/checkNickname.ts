/**
 * 닉네임 중복 확인 (GET /api/users/check-nickname)
 * URI: /api/users/check-nickname
 */


// Response
export type CheckNicknameResult = {
    nickname: string;
    isAsvailable: boolean;
}