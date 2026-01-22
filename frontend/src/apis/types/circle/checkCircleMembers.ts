import type { CheckCircleMemberInfo } from "../common";

/**
 * 해당 써클의 구성원을 조회합니다. (GET /api/circles/{circleId}/members)
 * URI: /api/circles/{circleId}/members
 */

// Request
// 백엔드 스펙상 reason/agreed 포함(현재 미사용), 추후 업데이트 예정
export interface CheckCircleMembersRequest {
    reason?: string | null;
    agreed: boolean;
};


// Response
// ./common.ts 에서 ApiResultResponse<T> 사용
export type CheckCircleMembersResult = {
    isLeader: boolean;
    members: CheckCircleMemberInfo[];
};
