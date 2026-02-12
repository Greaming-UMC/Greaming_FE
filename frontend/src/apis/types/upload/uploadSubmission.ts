import type { ApiResultResponse } from "../common";

/**
 * 게시글 생성 (POST /api/submissions)
 * URI: /api/submissions
 */

export type UploadSubmissionVisibility = "PUBLIC" | "CIRCLE";
export type UploadSubmissionField = "FREE" | "DAILY" | "WEEKLY";

// Request
export interface UploadSubmissionRequest {
  title: string;
  caption: string;
  visibility: UploadSubmissionVisibility;
  field: UploadSubmissionField;
  thumbnailKey: string;
  commentEnabled: boolean;
  tags: string[];
  imageList: string[];
}

export interface UploadSubmissionTag {
  tagId: number;
  tagName: string;
}

// Swagger 예시 기반
export interface UploadSubmissionResult {
  submissionId: number;
  userId: number;
  nickname?: string;
  profileImgUrl?: string;
  level?: string;
  imageList?: string[];
  likesCount?: number;
  commentCount?: number;
  bookmarkCount?: number;
  title?: string;
  caption?: string;
  tags?: UploadSubmissionTag[];
  liked?: boolean;
}

// Response
export type UploadSubmissionResponse = ApiResultResponse<UploadSubmissionResult>;
