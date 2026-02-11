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
import { http } from "../../../libs/http/client";
import type { UploadSubmissionPayload } from "../config/types";

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
    "/api/submissions",
    payload
  );
  return res.data;
}

