import type { ExploreCircleInfo } from "../common";

/**
 * 써클 검색(Search) (GET /api/circles/search)
 * URI: /api/circles/search
 */

// Request
export interface ExploreCircleRequest {
    keyword? : string | null;
    page? : number | null;
    size? : number | null;
};


// Response
// ApiResultResponse<ExploreUsersResult>
export type ExploreCircleResult = {
    circles : ExploreCircleInfo[];
    totalPage : number;
    totalElements : number;
};
