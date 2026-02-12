import type {
  UploadSubmissionField,
  UploadSubmissionRequest,
  UploadSubmissionVisibility,
} from "../../../apis/types/upload";

export type UploadFieldType = UploadSubmissionField;
export type UploadVisibilityType = UploadSubmissionVisibility;

export type UploadImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  signature: string;
  key?: string; // S3 업로드 후 서버가 준 key 저장
};

export type UploadSubmissionPayload = UploadSubmissionRequest;
