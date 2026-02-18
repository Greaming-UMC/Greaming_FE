import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../libs/security/authStore";
import { clearAccessToken } from "../../libs/security/tokenStore";
import { stopPreemptiveRefresh } from "../../libs/security/refreshManeger";
import { useHeaderProfileStore } from "../../stores/useHeaderProfileStore";
import { checkAuthByReissue, type AuthCheckResult } from "../types/auth";
import { logout } from "../logout";

type UseAuthCheckOptions = {
  enabled?: boolean;
};

export const useAuthCheck = (options?: UseAuthCheckOptions) => {
  return useQuery<AuthCheckResult>({
    queryKey: ["auth", "reissue"],
    queryFn: checkAuthByReissue,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const setUnauthenticated = useAuthStore((state) => state.setUnauthenticated);
  const clearProfile = useHeaderProfileStore((state) => state.clearProfile);

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      stopPreemptiveRefresh();
      clearAccessToken();
      setUnauthenticated();
      clearProfile();
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });
};
