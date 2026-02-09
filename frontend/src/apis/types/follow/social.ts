import type { FollowState } from "../common";

/**
 * 특정 유저에게 팔로우(요청) (POST /api/users/{targetId}/follows)
 * URI: /api/users/{targetId}/follows
 */


// Response
// ./common.ts 에서 ApiDataResponse<T> 사용
export type FollowRequestResult = {
    followId: number;
    followState: FollowState;
    createdAt: string;
};



/**
 * 팔로워 목록에서 특정 유저 제거 (DELETE /api/users/{targetId}/follows)
 * URI: /api/users/{targetId}/follows
 */

// ./common.ts 에서 ApiDataResponse<null> 사용