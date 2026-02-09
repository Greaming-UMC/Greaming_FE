import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckUserProfileResult } from "../../../apis/types/user";
import { profileQueryKeys } from "./profileQueryKeys";

export const useUserProfile = (userId?: number) =>
  useQuery<ApiResultResponse<CheckUserProfileResult>, Error>({
    queryKey:
      typeof userId === "number"
        ? profileQueryKeys.user(userId)
        : ["profile", "user", "none"],
    queryFn: () => getUserProfile(userId!),
    enabled: typeof userId === "number",
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
