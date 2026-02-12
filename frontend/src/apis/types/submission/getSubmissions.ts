import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "../common";
import { unwrapResult } from "../unwrap";
import type { CheckSubmissionsRequest, CheckSubmissionsResult } from "./checkSubmissions";

export const getSubmissions = async (
  params: CheckSubmissionsRequest,
): Promise<CheckSubmissionsResult> => {
  const { data } = await http.get<ApiResultResponse<CheckSubmissionsResult>>(
    ENDPOINTS.SUBMISSION.GET_SUBMISSIONS,
    { params },
  );
  return unwrapResult(data);
};
