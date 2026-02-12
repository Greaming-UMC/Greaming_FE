/**
 * 닉네임 중복 확인 (GET /api/users/check-nickname)
 * URI: /api/users/check-nickname
 */


//Request
export interface CheckNicknameParamas {
    nickname : string;
};


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type CheckNicknameResult = {
    nickname: string;
    isAvailable: boolean;
};