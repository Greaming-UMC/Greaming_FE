/**
 * 써클 프로필정보, 써클원 작품들 조회 (GET /api/circles/{circleId})
 * URI: /api/circles/{circleId}
 */


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type CheckCircleProfileResult = {
    circle_Information: {
        circle_name: string;
        profileImgUrl: string;
        leader_name: string;
        introduction: string;
        member_count: number;
        isleader: boolean;
        isJoining: boolean;
    }
};