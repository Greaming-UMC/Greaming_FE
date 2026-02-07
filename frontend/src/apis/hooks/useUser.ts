import { useQuery } from '@tanstack/react-query';
import { getUserProfile, type UserProfileResponse } from '../types/user';

export const useUserProfile = () => {
  return useQuery<UserProfileResponse>({
    queryKey: ['me'], // 데이터를 캐싱
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};