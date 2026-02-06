import { useQuery } from "@tanstack/react-query";
import { getCircleSubmissions } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type {
  CheckCircleSubmissionsRequest,
  CheckCircleSubmissionsResult,
} from "../../../apis/types/circle";
import { profileQueryKeys } from "./profileQueryKeys";

export const useCircleSubmissions = (
  circleId?: number,
  params?: CheckCircleSubmissionsRequest,
) =>
  useQuery<ApiResultResponse<CheckCircleSubmissionsResult>, Error>({
    queryKey:
      typeof circleId === "number"
        ? profileQueryKeys.circleSubmissions(circleId, params)
        : ["profile", "circleSubmissions", "none"],
    queryFn: () => getCircleSubmissions(circleId!, params ?? {}),
    enabled: typeof circleId === "number",
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
