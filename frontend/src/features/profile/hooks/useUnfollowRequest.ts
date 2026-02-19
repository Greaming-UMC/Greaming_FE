import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckUserProfileResult } from "../../../apis/types/user";
import { deleteFollowRequest } from "../api/api";
import { profileQueryKeys } from "./profileQueryKeys";

export const useUnfollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResultResponse<null>, Error, number>({
    mutationFn: async (targetId: number) => {
      const data = await deleteFollowRequest(targetId);
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
    onSuccess: (_data, targetId) => {
      queryClient.setQueryData<ApiResultResponse<CheckUserProfileResult>>(
        profileQueryKeys.user(targetId),
        (prev) => {
          if (!prev?.result) return prev;
          const currentInfo =
            prev.result.user_information ?? prev.result.userInformation;
          if (!currentInfo) return prev;

          return {
            ...prev,
            result: {
              ...prev.result,
              user_information: { ...currentInfo, followState: undefined },
            },
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: profileQueryKeys.user(targetId) });
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.my });
    },
  });
};
