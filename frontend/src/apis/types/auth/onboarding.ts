import type { UsagePurpose } from '../common';

/**
 * 최초 정보 기입 요청 (POST /api/users/registinfo)
 * URI: /api/users/registinfo
 */

// Request
export interface RegisterInfoRequest {
  nickname: string;
  intro: string;
  specialtyTags: string[];
  interestTags: string[];
  journeyLevel: UsagePurpose;
  weeklyGoalScore: number;
  profileImageKey?: string;
}


// Response
// ./common.ts 에서 ApiResultResponse<null> 사용
