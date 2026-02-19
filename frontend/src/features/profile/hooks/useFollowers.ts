import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { GetFollowersParams, GetFollowersResult } from "../../../apis/types/follow";
import { profileQueryKeys } from "./profileQueryKeys";

type UseFollowersOptions = {
  enabled?: boolean;
};

export const useFollowers = (
  userId?: number,
  params?: GetFollowersParams,
  options?: UseFollowersOptions,
) =>
  useQuery<ApiResultResponse<GetFollowersResult>, Error>({
    queryKey:
      typeof userId === "number"
        ? profileQueryKeys.followers(userId, params)
        : ["profile", "followers", "none"],
    queryFn: () => getFollowers(userId!, params ?? {}),
    enabled: (options?.enabled ?? true) && typeof userId === "number",
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
