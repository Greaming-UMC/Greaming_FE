/**
 * 계정 삭제 (DELETE /api/users/me)
 * URI: /api/users/me
 */


// Request
export interface DeleteAccountRequest {
    reason?: string | null;
    agreed: boolean;
};


// Response
// ApiResultSuccessResponse<DeleteAccountResult>
export type DeleteAccountResult = {
    userId: number;
    deleteAt: string;
};