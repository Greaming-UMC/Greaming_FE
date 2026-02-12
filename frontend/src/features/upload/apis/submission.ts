import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { UploadSubmissionResponse } from "../../../apis/types/upload";
import type { UploadSubmissionPayload } from "../config/types";

export async function postSubmission(payload: UploadSubmissionPayload) {
  const res = await http.post<UploadSubmissionResponse>(
    ENDPOINTS.SUBMISSION.CREATE,
    payload
  );

  if (!res.data?.isSuccess || !res.data?.result) {
    throw new Error(res.data?.message ?? "게시물 생성 실패");
  }

  return res.data.result;
}
