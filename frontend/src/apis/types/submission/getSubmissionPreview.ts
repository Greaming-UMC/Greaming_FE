import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "../common";
import { unwrapResult } from "../unwrap";
import type { CheckSubmissionPreviewResult } from "./checkSubmissionPreview";

export const getSubmissionPreview = async (
  submissionId: number | string,
): Promise<CheckSubmissionPreviewResult> => {
  const { data } = await http.get<ApiResultResponse<CheckSubmissionPreviewResult>>(
    ENDPOINTS.SUBMISSION.GET_SUBMISSION_PREVIEW(submissionId),
  );
  return unwrapResult(data);
};
