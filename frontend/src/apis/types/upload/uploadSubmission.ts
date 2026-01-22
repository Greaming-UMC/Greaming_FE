import type { VisibilityType } from '../common';

/**
 * 일간/주간 챌린지, 서클 게시물 업로드 (POST /api/users/upload)
 * URI: /api/users/upload
 */

// Request
export interface UploadSubmissionRequest {
    title : string;
    caption : string;
    visibility : VisibilityType;
    commentEnabled : boolean;
    challengeId : number;
    circleId? : number | null;
    hashtags : string[];
    imageUrls : string[];
};

// Response
// ./common.ts의 ApiDataResponse, ApiErrorResponese 사용