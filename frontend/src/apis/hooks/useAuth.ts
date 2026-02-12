import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../libs/security/authStore";
import { clearAccessToken } from "../../libs/security/tokenStore";
import { useHeaderProfileStore } from "../../stores/useHeaderProfileStore";
import { checkAuthTest, type AuthTestResult } from "../types/auth";
import { logout } from "../logout";

type UseAuthCheckOptions = {
  enabled?: boolean;
};

export const useAuthCheck = (options?: UseAuthCheckOptions) => {
  return useQuery<AuthTestResult>({
    queryKey: ["auth", "test"],
    queryFn: checkAuthTest,
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
      clearAccessToken();
      setUnauthenticated();
      clearProfile();
      queryClient.removeQueries({ queryKey: ["me"] });
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });
};
