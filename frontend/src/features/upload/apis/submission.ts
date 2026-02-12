import { http } from "../../../libs/http/client";
import type { UploadSubmissionPayload } from "../config/types";

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};

type SubmissionCreateSuccess = {
  submission_id: number;
  created_at: string;
};

export async function postSubmission(payload: UploadSubmissionPayload) {
  const res = await http.post<ApiResponse<SubmissionCreateSuccess>>("/api/submissions", payload);

  if (!res.data?.data) {
    throw new Error(res.data?.message ?? "게시물 생성 실패");
  }

  return res.data.data;
}
