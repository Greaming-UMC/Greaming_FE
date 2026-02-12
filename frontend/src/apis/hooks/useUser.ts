import { useQuery } from '@tanstack/react-query';
import type { CheckMyProfileResponse } from '../types/user';
import { getMyProfileHeader } from '../user';

type UseUserProfileOptions = {
  enabled?: boolean;
};

export const useUserProfile = (options?: UseUserProfileOptions) => {
  return useQuery<CheckMyProfileResponse>({
    queryKey: ['me'],
    queryFn: getMyProfileHeader,
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
