import { useQuery } from "@tanstack/react-query";
import { checkAuthTest, type AuthTestResult } from "../types/auth";

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
