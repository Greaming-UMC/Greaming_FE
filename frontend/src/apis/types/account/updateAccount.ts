/**
 * 계정 상태 변경 (PUT /api/users/me/status)
 * URI: /api/users/me/status
 */

export type AccountStatus = "ACTIVE" | "SUSPENDED";

// Request
export interface UpdateAccountRequest {
    password: string;
    status: AccountStatus;
    reason?: string | null;
    duration?: number | null;
};


// Response
// ApiResultSuccessResponse<UpdateAccountResult>
export type UpdateAccountResult = {
    userId: number;
    status: AccountStatus;
    updatedAt: string;
    reactivationDate: string | null;
};