import { useQuery } from "@tanstack/react-query";
import { getMySubmissions } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type {
  CheckMySubmissionsRequest,
  CheckMySubmissionsResult,
} from "../../../apis/types/userSubmissions";
import { profileQueryKeys } from "./profileQueryKeys";

type UseMySubmissionsOptions = {
  enabled?: boolean;
};

export const useMySubmissions = (
  params?: CheckMySubmissionsRequest,
  options?: UseMySubmissionsOptions,
) =>
  useQuery<ApiResultResponse<CheckMySubmissionsResult>, Error>({
    queryKey: profileQueryKeys.mySubmissions(params),
    queryFn: () => getMySubmissions(params ?? {}),
    enabled: options?.enabled ?? true,
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
