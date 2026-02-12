import { useQuery } from "@tanstack/react-query";
import { getUserSubmissions } from "../api/api";
import type {
  ApiDataSuccessResponse,
  ApiResultResponse,
  ApiStatusResponse,
  CheckSubmissionInterceptor,
  PageInfo,
} from "../../../apis/types/common";
import type {
  GetUserSubmissionsResult,
} from "../../../apis/types/submission/getUserSubmissions";
import { profileQueryKeys } from "./profileQueryKeys";

type UseUserSubmissionsOptions = {
  enabled?: boolean;
};

const EMPTY_PAGE_INFO: PageInfo = {
  currentPage: 1,
  pageSize: 20,
  totalPages: 0,
  totalElements: 0,
  isLast: true,
  isFirst: true,
};

const EMPTY_RESULT: GetUserSubmissionsResult = {
  submissions: [],
  pageInfo: EMPTY_PAGE_INFO,
};

type UserSubmissionsEnvelope =
  | ApiResultResponse<GetUserSubmissionsResult>
  | ApiDataSuccessResponse<GetUserSubmissionsResult>
  | ApiStatusResponse<GetUserSubmissionsResult>
  | GetUserSubmissionsResult;

const normalizeUserSubmissions = (
  data: UserSubmissionsEnvelope,
): ApiResultResponse<GetUserSubmissionsResult> => {
  if ("isSuccess" in data) {
    if (!data.isSuccess) {
      throw new Error(`${data.code}: ${data.message}`);
    }
    const result = "result" in data ? data.result : data.data;
    return {
      isSuccess: true,
      code: data.code,
      message: data.message,
      result: result ?? EMPTY_RESULT,
    };
  }

  if ("status" in data) {
    if (data.status >= 400) {
      throw new Error(`${data.status}: ${data.message}`);
    }
    return {
      isSuccess: true,
      code: String(data.status),
      message: data.message,
      result: data.data ?? EMPTY_RESULT,
    };
  }

  return {
    isSuccess: true,
    code: "COMMON200",
    message: "OK",
    result: data,
  };
};

export const useUserSubmissions = (
  userId?: number,
  params?: CheckSubmissionInterceptor,
  options?: UseUserSubmissionsOptions,
) =>
  useQuery<
    UserSubmissionsEnvelope,
    Error,
    ApiResultResponse<GetUserSubmissionsResult>
  >({
    queryKey:
      typeof userId === "number"
        ? profileQueryKeys.userSubmissions(userId, params)
        : ["profile", "userSubmissions", "none"],
    queryFn: () =>
      getUserSubmissions(userId!, params ?? {}) as Promise<UserSubmissionsEnvelope>,
    enabled: (options?.enabled ?? true) && typeof userId === "number",
    select: normalizeUserSubmissions,
  });
