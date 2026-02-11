// // src/features/upload/config/types.ts
// import type { UploadSubmissionType } from "../../../apis/types/common";

// /** 업로드 페이지 모드(일반/데일리/위클리/써클) */
// export type UploadMode = UploadSubmissionType;

// /** 업로드 이미지 아이템(UI 상태용) */
// export type UploadImageItem = {
//   id: string;
//   file: File;
//   previewUrl: string;
//   signature: string; // 중복 방지용
// };

// /** S3 presigned-url 응답에서 우리가 쓸 값 */
// export type PresignedResult = {
//   url: string; // PUT 업로드 할 presigned url
//   key: string; // 서버 DB에 저장하는 key
// };

// src/features/upload/config/types.ts

// export type UploadFieldType = "FREE" | "DAILY" | "WEEKLY" | "CIRCLE";

// export type UploadImageItem = {
//   id: string;
//   file: File;
//   previewUrl: string;
//   signature: string; // 중복 방지용
//   key?: string; // S3 업로드 후 서버가 준 key 저장
// };

// export type UploadSubmissionPayload = {
//   title: string;
//   caption: string;
//   visibility: "PUBLIC" | "CIRCLE";
//   field: "FREE" | "DAILY" | "WEEKLY";
//   thumbnailKey: string;
//   commentEnabled: boolean;
//   tags: string[];
//   imageList: string[];
// };

export type UploadFieldType = "FREE" | "DAILY" | "WEEKLY";
export type UploadVisibilityType = "PUBLIC";
/** 업로드 UI에서 쓰는 이미지 아이템 */
export type UploadImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  signature: string;
};

/** /api/submissions 요청 payload */
export type UploadSubmissionPayload = {
  title: string;
  caption: string;
  visibility: UploadVisibilityType;     // "PUBLIC" | "PRIVATE"
  field: UploadFieldType;         // "FREE" | "DAILY" | "WEEKLY"
  thumbnailKey: string;           // S3 key (URL 아님)
  commentEnabled: boolean;
  tags: string[];
  imageList: string[];            // S3 key list (URL 아님)
};