import { useInfiniteQuery, useMutation, useQueryClient, useQuery, type InfiniteData,  } from '@tanstack/react-query';
import { 
  getFollowers, 
  getFollowings, 
  followUser, 
  unfollowUser, 
  getCircleMembers, 
  kickCircleMember 
} from '../apis/socialApi';
import type { GetSocialFollowersResponse, GetSocialFollowingsResponse } from '../types';

// 1. 🟢 팔로잉 목록 무한 스크롤 훅
export const useInfiniteFollowings = (userId: number, size: number = 10) => {
  return useInfiniteQuery<
    GetSocialFollowingsResponse,
    Error,
    InfiniteData<GetSocialFollowingsResponse>,
    (string | number)[],
    number | null
  >({
    queryKey: ['followings', userId],
    queryFn: ({ pageParam = null }) => 
      getFollowings(userId, { cursorId: pageParam, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      // hasNext가 false거나 nextCursor가 없으면 중단
      if (!lastPage.data?.hasNext || !lastPage.data?.nextCursor) return undefined;
      // 서버의 string 커서를 number로 변환해서 전달
      return Number(lastPage.data.nextCursor);
    },
  });
};

// 2. 🟢 팔로워 목록 무한 스크롤 훅
export const useInfiniteFollowers = (userId: number, size: number = 10) => {
  return useInfiniteQuery<
    GetSocialFollowersResponse,
    Error,
    InfiniteData<GetSocialFollowersResponse>,
    (string | number)[],
    number | null
  >({
    queryKey: ['followers', userId],
    queryFn: ({ pageParam = null }) => 
      getFollowers(userId, { cursorId: pageParam, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data?.hasNext || !lastPage.data?.nextCursor) return undefined;
      return Number(lastPage.data.nextCursor);
    },
  });
};

// 3. 🟢 팔로우/언팔로우 액션 훅
export const useFollowAction = () => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      // 팔로우 성공 시 목록 무효화하여 최신화
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
    },
  });

  return { followMutation, unfollowMutation };
};

// 4. 🟢 써클 멤버 목록 조회 훅 (무한 스크롤 아님)
export const useCircleMembers = (circleId: number) => {
  return useQuery({
    queryKey: ['circleMembers', circleId],
    queryFn: () => getCircleMembers(circleId),
    enabled: !!circleId,
  });
};

// 5. 🟢 써클 멤버 강퇴 훅
export const useKickMember = (circleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) => kickCircleMember(circleId, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circleMembers', circleId] });
    },
  });
};