/**
 * 계정 삭제 (DELETE /api/users/me)
 * URI: /api/users/me
 */


// Request
export interface DeleteAccountRequest {
    reason: string;
    agreed: boolean;
}


// Response
export type DeleteAccountResult = {
    userId: number;
    deleteAt: string;
}