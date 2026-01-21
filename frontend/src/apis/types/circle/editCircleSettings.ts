/**
 * 써클 이름, 소개, 인원 제한, 공개 여부, 대표 이미지를 수정합니다. (PUT /api/circles/{circleId})
 * URI: /api/circles/{circleId}
 */

// Request
export interface editCircleSettingsRequest {
    name?: string | null;
    introduction?: string | null;
    profileUrl?: string | null;
    capacity?: number | null;
    isPrevate?: boolean | null;
};


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type editCircleSettingsResult = {
    circleId: number;
    name: string;
    updatedAt: string;
};