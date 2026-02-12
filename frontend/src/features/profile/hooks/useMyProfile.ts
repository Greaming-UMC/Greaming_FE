import { useUserProfile } from "../../../apis/hooks/useUser";

type UseMyProfileOptions = {
  enabled?: boolean;
};

export const useMyProfile = (options?: UseMyProfileOptions) =>
  useUserProfile({
    enabled: options?.enabled ?? true,
  });
