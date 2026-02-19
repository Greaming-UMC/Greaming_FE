import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckUserProfileResult } from "../../../apis/types/user";
import type { ToggleFollowResult } from "../../../apis/types/follow";
import { postFollowRequest } from "../api/api";
import { profileQueryKeys } from "./profileQueryKeys";

export const useFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResultResponse<ToggleFollowResult>, Error, number>({
    mutationFn: async (targetId: number) => {
      const data = await postFollowRequest(targetId);
      if (!data.isSuccess) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      return data;
    },
    onSuccess: (_data, targetId) => {
      const nextState = _data.result?.isFollowing ? "COMPLETED" : undefined;
      queryClient.setQueryData<ApiResultResponse<CheckUserProfileResult>>(
        profileQueryKeys.user(targetId),
        (prev) => {
          if (!prev?.result) return prev;
          const currentInfo = prev.result.user_information ?? prev.result.userInformation;
          const isFlat = typeof prev.result.nickname === "string";

          if (!currentInfo && !isFlat) return prev;

          return {
            ...prev,
            result: {
              ...prev.result,
              ...(isFlat
                ? {
                    followState: nextState,
                    isFollowing: nextState === "COMPLETED",
                  }
                : {}),
              ...(currentInfo
                ? {
                    user_information: {
                      ...currentInfo,
                      followState: nextState,
                      isFollowing: nextState === "COMPLETED",
                    },
                  }
                : {}),
            },
          };
        },
      );

      queryClient.invalidateQueries({ queryKey: profileQueryKeys.user(targetId) });
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.my });
    },
  });
};
