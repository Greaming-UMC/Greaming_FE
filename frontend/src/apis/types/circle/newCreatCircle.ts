/**
 * 새로운 써클을 생성한다. (POST /api/circles)
 * URI: /api/circles
 */

// Request
export interface newCreatCircleRequest {
    name?: string | null; // 중복 불가
    introduction?: string | null;
    profileUrl?: string | null;
    capacity?: number | null; // 1명 이상
    isPrivate?: boolean;
};


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type newCreatCircleResult = {
    circleId: number;
    createdAt: string;
};