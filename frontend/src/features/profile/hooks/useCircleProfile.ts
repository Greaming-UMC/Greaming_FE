import { useQuery } from "@tanstack/react-query";
import { getCircleProfile } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckCircleProfileResult } from "../../../apis/types/circle";
import { profileQueryKeys } from "./profileQueryKeys";

export const useCircleProfile = (circleId?: number) =>
  useQuery<ApiResultResponse<CheckCircleProfileResult>, Error>({
    queryKey:
      typeof circleId === "number"
        ? profileQueryKeys.circle(circleId)
        : ["profile", "circle", "none"],
    queryFn: () => getCircleProfile(circleId!),
    enabled: typeof circleId === "number",
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
