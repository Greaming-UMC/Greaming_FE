export type UploadFieldType = "FREE" | "DAILY" | "WEEKLY";
export type UploadVisibilityType = "PUBLIC" | "CIRCLE";

export type UploadImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  signature: string;
  key?: string; // S3 업로드 후 서버가 준 key 저장
};

export type UploadSubmissionPayload = {
  title: string;
  caption: string;
  visibility: UploadVisibilityType;
  field: UploadFieldType;
  challengeId: number | null;
  thumbnailKey: string;     // S3 key (URL 아님)
  commentEnabled: boolean;
  tags: string[];
  imageList: string[];      // S3 key list (URL 아님)
};
