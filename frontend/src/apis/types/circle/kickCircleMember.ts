/**
 * 해당 써클의 구성원을 제거합니다. (DELETE /api/circles/{circleId}/members/{memberId})
 * URI: /api/circles/{circleId}/members/{memberId}
 */


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type kickCircleMembersResult = {
    kickUserId: number;
    circleId: number;
};