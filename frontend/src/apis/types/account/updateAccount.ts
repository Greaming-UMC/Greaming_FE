/**
 * 계정 상태 변경 (PUT /api/users/me/status)
 * URI: /api/users/me/status
 */


// Request
export interface UpdateAccountRequest {
    password: string;
    status: string;
    reason: string;
    duration: number;
}


// Response
export type UpdateAccountResult = {
    userId: number;
    status: string;
    updatedAt: string;
    reactivationDate: string | null;
}