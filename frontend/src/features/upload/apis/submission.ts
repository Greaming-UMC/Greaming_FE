// import { http } from "../../../libs/http/client";
// import { normalizeApiPath } from "./normalizePath";
// import type { UploadSubmissionRequest } from "../../../apis/types/upload/uploadSubmission";

// type UploadSuccess = {
//   submission_id: number;
//   created_at: string;
// };

// type UploadResponse = {
//   status: number;
//   message: string;
//   data: UploadSuccess | null;
// };

// export async function postUploadSubmission(payload: UploadSubmissionRequest) {
//   const path = normalizeApiPath("/api/users/upload");
//   const res = await http.post<UploadResponse>(path, payload, {
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.data;
// }

// src/features/upload/apis/submissions.ts
// import { http } from "../../../libs/http/client";
// import type { UploadSubmissionPayload } from "../config/types";

// type ApiResponse<T> = {
//   status: number;
//   message: string;
//   data: T;
// };

// type SubmissionCreateSuccess = {
//   submission_id: number;
//   created_at: string;
// };

// export async function postSubmission(payload: UploadSubmissionPayload) {
//   const res = await http.post<ApiResponse<SubmissionCreateSuccess>>(
//     "/api/submissions",
//     payload
//   );
//   return res.data;
// }


// import { http } from "../../../libs/http/client";
// import type { UploadSubmissionPayload } from "../config/types";

// /**
//  * swagger: POST /api/submissions
//  * 서버 응답 형태가 프로젝트마다 다를 수 있어 가장 단순 형태로 래핑
//  */
// export type ApiResponse<T> = {
//   status: number;
//   message: string;
//   data: T;
// };

// export type SubmissionCreateSuccess = {
//   submission_id: number;
//   created_at: string;
// };

// export async function postSubmission(payload: UploadSubmissionPayload) {
//   const res = await http.post<ApiResponse<SubmissionCreateSuccess>>(
//     "/api/submissions",
//     payload,
//   );
//   return res.data;
// }

import { http } from "../../../libs/http/client";
import type { UploadSubmissionPayload } from "../config/types";
import { normalizeApiPath } from "./normalizePath";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

type SubmissionCreateSuccess = {
  submission_id: number;
  created_at: string;
};

export async function postSubmission(payload: UploadSubmissionPayload) {
  const res = await http.post<ApiResponse<SubmissionCreateSuccess>>(
    normalizeApiPath("/api/submissions"),
    payload,
  );
  return res.data;
}