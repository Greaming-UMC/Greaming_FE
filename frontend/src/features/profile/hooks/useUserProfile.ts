import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/api";
import type {
  ApiDataSuccessResponse,
  ApiResultResponse,
  ApiStatusResponse,
} from "../../../apis/types/common";
import type { CheckUserProfileResult } from "../../../apis/types/user";
import { profileQueryKeys } from "./profileQueryKeys";

type UseUserProfileOptions = {
  enabled?: boolean;
};

type UserProfileEnvelope =
  | ApiResultResponse<CheckUserProfileResult>
  | ApiDataSuccessResponse<CheckUserProfileResult>
  | ApiStatusResponse<CheckUserProfileResult>
  | CheckUserProfileResult;

const normalizeUserProfile = (
  data: UserProfileEnvelope,
): ApiResultResponse<CheckUserProfileResult> => {
  if ("isSuccess" in data) {
    if (!data.isSuccess) {
      throw new Error(`${data.code}: ${data.message}`);
    }
    const result = "result" in data ? data.result : data.data;
    return {
      isSuccess: true,
      code: data.code,
      message: data.message,
      result: result ?? {},
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
      result: data.data ?? {},
    };
  }

  return {
    isSuccess: true,
    code: "COMMON_200",
    message: "OK",
    result: data,
  };
};

export const useUserProfile = (userId?: number, options?: UseUserProfileOptions) =>
  useQuery<UserProfileEnvelope, Error, ApiResultResponse<CheckUserProfileResult>>({
    queryKey:
      typeof userId === "number"
        ? profileQueryKeys.user(userId)
        : ["profile", "user", "none"],
    queryFn: () => getUserProfile(userId!) as Promise<UserProfileEnvelope>,
    enabled: (options?.enabled ?? true) && typeof userId === "number",
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    select: normalizeUserProfile,
  });
