import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "../common";
import { unwrapResult } from "../unwrap";
import type { CheckChallengeDateSubmissionsRequest, CheckChallengeDateSubmissionsResult } from "./checkChallengeSubmissions";

export const getChallengeDateSubmissions = async (
  params: CheckChallengeDateSubmissionsRequest,
): Promise<CheckChallengeDateSubmissionsResult> => {
  const { data } = await http.get<ApiResultResponse<CheckChallengeDateSubmissionsResult>>(
    ENDPOINTS.CHALLENGE.GET_DATE_SUBMISSIONS,
    { params },
  );
  return unwrapResult(data);
};
