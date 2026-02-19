import type { PageInfo, UsagePurpose } from '../common';
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

// ----------------------------------------------------
// 최신 스펙 (result.users + pageInfo)
// ----------------------------------------------------
export interface GetFollowersParams {
  page?: number;
  size?: number;
}

export interface FollowListUser {
  userId: number;
  nickname: string;
  profileImgUrl: string | null;
  journeyLevel: UsagePurpose;
  specialtyTags: string[];
  interestTags: string[];
  isFollower: boolean;
  isFollowing: boolean;
}

export interface GetFollowersResult {
  users: FollowListUser[];
  pageInfo: PageInfo;
}
