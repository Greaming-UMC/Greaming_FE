import { useQuery } from "@tanstack/react-query";
import { getFollowings } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type {
  GetFollowingsParams,
  GetFollowingsResult,
} from "../../../apis/types/follow";
import { profileQueryKeys } from "./profileQueryKeys";

type UseFollowingsOptions = {
  enabled?: boolean;
};

export const useFollowings = (
  userId?: number,
  params?: GetFollowingsParams,
  options?: UseFollowingsOptions,
) =>
  useQuery<ApiResultResponse<GetFollowingsResult>, Error>({
    queryKey:
      typeof userId === "number"
        ? profileQueryKeys.followings(userId, params)
        : ["profile", "followings", "none"],
    queryFn: () => getFollowings(userId!, params ?? {}),
    enabled: (options?.enabled ?? true) && typeof userId === "number",
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
