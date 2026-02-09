/**
 * 특정 유저에게 초대장을 보낸다 (POST /api/users/{targetId}/invites)
 * URI: /api/users/{targetId}/invites
 */

// Request
export interface InviteCircleRequest {
    targetUserId: number;
};


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type InviteCircleResult = {
    circleId: number;
};