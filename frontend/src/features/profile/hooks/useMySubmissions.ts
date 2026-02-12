import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfileHeader } from "../../../apis/user";
import { getUserSubmissions } from "../api/api";
import type {
  ApiResultResponse,
  CheckSubmissionInterceptor,
} from "../../../apis/types/common";
import type { GetUserSubmissionsResult } from "../../../apis/types/submission/getUserSubmissions";
import type { CheckMyProfileResponse } from "../../../apis/types/user";
import { profileQueryKeys } from "./profileQueryKeys";

type UseMySubmissionsOptions = {
  enabled?: boolean;
};

const MY_PROFILE_QUERY_KEY = ["me"] as const;

const toNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const extractMyUserId = (result: unknown): number | null => {
  if (!result || typeof result !== "object") return null;
  const root = result as Record<string, unknown>;
  const snakeInfo = root.user_information as Record<string, unknown> | undefined;
  const camelInfo = root.userInformation as Record<string, unknown> | undefined;

  const candidates = [
    root.userId,
    root.user_id,
    root.id,
    snakeInfo?.userId,
    snakeInfo?.user_id,
    snakeInfo?.id,
    camelInfo?.userId,
    camelInfo?.user_id,
    camelInfo?.id,
  ];

  for (const candidate of candidates) {
    const value = toNumber(candidate);
    if (value !== null) return value;
  }

  return null;
};

export const useMySubmissions = (
  params?: CheckSubmissionInterceptor,
  options?: UseMySubmissionsOptions,
) => {
  const queryClient = useQueryClient();

  return useQuery<ApiResultResponse<GetUserSubmissionsResult>, Error>({
    queryKey: profileQueryKeys.mySubmissions(params),
    enabled: options?.enabled ?? true,
    queryFn: async () => {
      const cached =
        queryClient.getQueryData<CheckMyProfileResponse>(MY_PROFILE_QUERY_KEY);
      const meResponse = cached ?? (await getMyProfileHeader());

      if (!cached) {
        queryClient.setQueryData(MY_PROFILE_QUERY_KEY, meResponse);
      }

      if (!meResponse.isSuccess) {
        throw new Error(`${meResponse.code}: ${meResponse.message}`);
      }
      if (!meResponse.result) {
        throw new Error("PROFILE_ME_RESULT_EMPTY");
      }

      const info =
        meResponse.result.user_information ??
        meResponse.result.userInformation;
      const userId = toNumber(info?.userId) ?? extractMyUserId(meResponse.result);
      if (userId === null) {
        throw new Error("PROFILE_ME_USER_ID_NOT_FOUND");
      }

      return getUserSubmissions(userId, params ?? {});
    },
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
};
