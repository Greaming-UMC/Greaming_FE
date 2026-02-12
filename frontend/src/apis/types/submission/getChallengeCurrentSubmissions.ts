import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "../common";
import { unwrapResult } from "../unwrap";
import type {
  CheckChallengeCurrentSubmissionsRequest,
  ChallengeSubmissionsResult,
} from "./checkChallengeSubmissions";

export const getChallengeCurrentSubmissions = async (
  params: CheckChallengeCurrentSubmissionsRequest,
): Promise<ChallengeSubmissionsResult> => {
  const { data } = await http.get<ApiResultResponse<ChallengeSubmissionsResult>>(
    ENDPOINTS.CHALLENGE.GET_CURRENT_SUBMISSIONS,
    { params },
  );
  return unwrapResult(data);
};
