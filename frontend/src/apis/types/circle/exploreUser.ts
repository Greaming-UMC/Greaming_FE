import type { ExploreCircleUserInfo } from "../common";

/**
 * 초대 유저 검색(Search) (GET /api/circles/{circleId}/users/search)
 * URI: /api/circles/{circleId}/users/search
 */

// Request
export interface ExploreUsersRequest {
    keyword: string;
};


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type ExploreUsersResult = ExploreCircleUserInfo[];
