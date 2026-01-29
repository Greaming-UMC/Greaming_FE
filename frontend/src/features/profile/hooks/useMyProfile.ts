import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/api";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckMyProfileResult } from "../../../apis/types/user";
import { profileQueryKeys } from "./profileQueryKeys";

export const useMyProfile = () =>
  useQuery<ApiResultResponse<CheckMyProfileResult>, Error>({
    queryKey: profileQueryKeys.my,
    queryFn: getMyProfile,
    select: (data) => {
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
  });
