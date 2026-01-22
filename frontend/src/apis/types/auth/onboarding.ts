import type { UsagePurpose, ArtField, ArtStyle } from '../common';

/**
 * 최초 정보 기입 요청 (POST /api/user/registinfo)
 * URI: /api/user/registinfo
 */

// Request
export interface RegisterInfoRequest {
  nickname: string;
  intro: string;

  specialties: {
    fields: ArtField[];
    style: ArtStyle;
  };

  interests: {
    fields: ArtField[];
    style: ArtStyle;
  };

  usage_purpose: UsagePurpose;
  weekly_goal_score: number;
};


// Response
// ./common.ts 에서 ApiResultResponse<null> 사용