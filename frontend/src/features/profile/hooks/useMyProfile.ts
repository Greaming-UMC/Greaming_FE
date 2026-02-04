import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckMyProfileResult } from "../../../apis/types/user";
import { profileQueryKeys } from "./profileQueryKeys";

type UseMyProfileOptions = {
  enabled?: boolean;
};

export const useMyProfile = (options?: UseMyProfileOptions) =>
  useQuery<ApiResultResponse<CheckMyProfileResult>, Error>({
    queryKey: profileQueryKeys.my,
    queryFn: getMyProfile,
    enabled: options?.enabled ?? true,
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
