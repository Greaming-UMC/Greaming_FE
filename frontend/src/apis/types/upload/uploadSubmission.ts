/**
 * 게시글 생성 (POST /api/submissions)
 * URI: /api/submissions
 */

export type SubmissionFieldType = "WEEKLY" | "DAILY" | "FREE";
export type UploadVisibilityType = "PUBLIC" | "CIRCLE";

export interface UploadSubmissionRequest {
  title: string;
  caption: string;
  visibility: UploadVisibilityType;
  field: SubmissionFieldType;
  challengeId: number | null;
  thumbnailKey: string;
  commentEnabled: boolean;
  tags: string[];
  imageList: string[];
}

export interface UploadSubmissionTag {
  tagId: number;
  tagName: string;
}

export interface UploadSubmissionResult {
  submissionId: number;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  level: string;
  imageList: string[];
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
  title: string;
  caption: string;
  tags: UploadSubmissionTag[];
  liked: boolean;
  uploadAt: string;
  field: SubmissionFieldType;
  challengeId: number | null;
}

export interface UploadSubmissionSuccessResponse {
  isSuccess: true;
  code: string; // SUBMISSION_200
  message: string;
  result: UploadSubmissionResult;
}

export interface UploadSubmissionErrorResponse {
  isSuccess: false;
  code: string; // COMM_400, CHALLENGE_404 ...
  message: string;
  result: null;
}

export type UploadSubmissionResponse =
  | UploadSubmissionSuccessResponse
  | UploadSubmissionErrorResponse;
