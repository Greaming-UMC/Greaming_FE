import { http } from "../../../libs/http/client";
import type { UploadSubmissionPayload } from "../config/types";

type ApiStatusResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};

type ApiResultResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
};

type ApiDataResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T | null;
};

type SubmissionCreateSuccess = {
  submissionId?: number;
  submission_id?: number;
  createdAt?: string;
  created_at?: string;
};

type UploadCreateResponse =
  | ApiResultResponse<SubmissionCreateSuccess>
  | ApiDataResponse<SubmissionCreateSuccess>
  | ApiStatusResponse<SubmissionCreateSuccess>
  | SubmissionCreateSuccess
  | null;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const extractSubmissionData = (
  raw: UploadCreateResponse,
): SubmissionCreateSuccess | null => {
  if (!isRecord(raw)) return null;

  if ("isSuccess" in raw && raw.isSuccess === false) {
    const message =
      typeof raw.message === "string" ? raw.message : "게시물 생성 실패";
    throw new Error(message);
  }

  if ("result" in raw && isRecord(raw.result)) {
    return raw.result as SubmissionCreateSuccess;
  }

  if ("data" in raw && isRecord(raw.data)) {
    return raw.data as SubmissionCreateSuccess;
  }

  if ("submissionId" in raw || "submission_id" in raw) {
    return raw as SubmissionCreateSuccess;
  }

  return null;
};

export async function postSubmission(payload: UploadSubmissionPayload) {
  const res = await http.post<UploadCreateResponse>("/api/submissions", payload);
  const parsed = extractSubmissionData(res.data);

  // 서버가 2xx를 반환했다면 생성 자체는 성공으로 간주합니다.
  // 일부 환경에서는 result/data를 비워서 응답합니다.
  if (res.status >= 200 && res.status < 300) {
    return parsed;
  }

  throw new Error("게시물 생성 실패");
}
