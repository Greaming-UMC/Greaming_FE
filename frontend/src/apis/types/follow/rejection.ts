/**
 * 특정 유저에게 온 팔로우 요청 수락 (POST /api/users/me/follow-requests)
 * URI: /api/users/me/follow-requests
 */


// Response
// ./common.ts 에서 ApiDataSuccessResponse<T> 사용
export type RejectionAcceptData = {
    followId: number;
    updatedState: string;
};



/**
 * 특정 유저에게 온 팔로우 요청 거절 (DELETE /api/users/{followerId}/follows/reject)
 * URI: /api/users/{followerId}/follows/reject
 */


// Response
// ./common.ts 에서 ApiDataSuccessResponse<null> 사용
