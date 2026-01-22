import type { FollowUserInfo } from '../common';
/**
 * 해당 유저가 팔로우하는 유저 목록 조회 (GET /api/users/{userId}/followings)
 * URI: /api/users/{userId}/followings
 */

// Reqeust
export interface CheckFollowingsParams {
    cursorId? : number | null;
    size? : number | null;
};


// Response
// ./common.ts 에서 ApiDataSuccessResponse<T> 사용
export type CheckFollowingsData = {
    data: FollowUserInfo[];
    hasNext: boolean;
    nextCursor: string | null;
};