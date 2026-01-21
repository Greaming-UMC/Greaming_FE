import type { FollowUserInfo } from '../common';
/**
 * 해당 유저를 팔로우하는 유저 목록 조회 (GET /api/users/{userId}/followers)
 * URI: /api/users/{userId}/followers
 */

// Request
export interface CheckFollowersParamas {
    cursorId? : number | null;
    size? : number | null;
};


// Response
// ./common.ts 에서 ApiDataSuccessResponse<T> 사용
export type CheckFollowersData = {
    data: FollowUserInfo[];
    hasNext: boolean;
    nextCursor: string | null;
};