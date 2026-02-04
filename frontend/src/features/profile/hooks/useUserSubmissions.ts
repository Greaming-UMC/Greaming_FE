import { useQuery } from "@tanstack/react-query";
import { getUserSubmissions } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type {
  CheckUserSubmissionsRequest,
  CheckUserSubmissionsResult,
} from "../../../apis/types/userSubmissions";
import { profileQueryKeys } from "./profileQueryKeys";

export const useUserSubmissions = (
  userId?: number,
  params?: CheckUserSubmissionsRequest,
) =>
  useQuery<ApiResultResponse<CheckUserSubmissionsResult>, Error>({
    queryKey:
      typeof userId === "number"
        ? profileQueryKeys.userSubmissions(userId, params)
        : ["profile", "userSubmissions", "none"],
    queryFn: () => getUserSubmissions(userId!, params ?? {}),
    enabled: typeof userId === "number",
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
