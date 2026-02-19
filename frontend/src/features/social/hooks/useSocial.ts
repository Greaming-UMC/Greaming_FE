import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getFollowers, 
  getFollowings, 
  followUser, 
  unfollowUser, 
  getCircleMembers, 
  kickCircleMember, 
  getCircles, 
  createCircle, 
  searchUsersForInvite 
} from '../api/api';
import { useInfiniteScroll } from './useInfiniteScroll';
import type { newCreatCircleRequest } from '../../../apis/types/circle';
import { useEffect } from 'react';

/** * 1. 팔로우 관련 훅
 * isOpen과 userId !== 0 조건을 통해 무한 루프와 500 에러를 원천 차단합니다.
 */
export const useInfiniteFollowings = (userId: number, isOpen: boolean = true, size: number = 10) => {
  const query = useInfiniteScroll(
    ['followings', userId], 
    (params) => getFollowings(userId, params), 
    size,
    isOpen && !!userId && userId !== 0
  );

  useEffect(() => {
    // 🔍 데이터 로드 성공 시 구조 확인용 로그
    if (query.data && !query.isFetching) {
      console.log("📍 API 응답 전체 구조:", query.data.pages[0]);
    }
    // 🔍 에러 발생 시 원인 확인
    if (query.isError) {
      console.error("❌ 팔로잉 로드 실패 원인:", query.error);
    }
  }, [query.data, query.isFetching, query.isError, query.error]); 

  return query;
};

export const useInfiniteFollowers = (userId: number, isOpen: boolean = true, size: number = 10) => {
  const query = useInfiniteScroll(
    ['followers', userId], 
    (params) => getFollowers(userId, params), 
    size,
    isOpen && !!userId && userId !== 0
  );

  useEffect(() => {
    if (query.data && !query.isFetching) {
      console.log(`✅ [팔로워 로드 성공] 유저ID: ${userId}`, query.data.pages);
    }
  }, [query.data, query.isFetching, userId]);

  return query;
};

export const useFollowAction = () => {
  const queryClient = useQueryClient();
  const invalidateSocialData = () => {
    queryClient.invalidateQueries({ queryKey: ['followings'] });
    queryClient.invalidateQueries({ queryKey: ['followers'] });
  };

  const followMutation = useMutation({ mutationFn: followUser, onSuccess: invalidateSocialData });
  const unfollowMutation = useMutation({ mutationFn: unfollowUser, onSuccess: invalidateSocialData });

  return { followMutation, unfollowMutation };
};

/**
 * 2. 써클 관련 훅 (🔴 API 미구현/에러로 인해 강제 비활성화)
 * 서버가 502/404 에러를 뱉고 있어 enabled를 false로 고정해 루프를 끊습니다.
 */
export const useInfiniteCircles = (keyword: string = '', size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['circles', keyword],
    queryFn: ({ pageParam = 1 }) => getCircles({ keyword, page: pageParam as number, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const result = lastPage?.result;
      if (!result) return undefined;
      const nextPage = allPages.length + 1;
      return nextPage <= result.totalPage ? nextPage : undefined;
    },
    // 🟢 404 에러 무한 재시도 방지를 위해 봉인
    enabled: false, 
    retry: false,
  });
};

export const useCircleMembers = (circleId: number, isOpen: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ['circleMembers', circleId],
    queryFn: () => getCircleMembers(circleId),
    // 🟢 API가 준비될 때까지 호출 자체를 하지 않음
    enabled: false, 
    initialPageParam: null,
    getNextPageParam: () => undefined,
    retry: false,
  });
};

export const useCreateCircle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: newCreatCircleRequest) => createCircle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circles'] });
    },
  });
};

export const useKickMember = (circleId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: number) => kickCircleMember(circleId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circleMembers', circleId] });
    },
  });
};

/**
 * 3. 검색 관련 훅
 */
export const useSearchUsers = (circleId: number, keyword: string, isOpen: boolean = true) => {
  return useInfiniteQuery({
    queryKey: ['searchUsers', circleId, keyword],
    queryFn: () => searchUsersForInvite(circleId, { keyword }), 
    // 🟢 검색어가 있고 모달이 열렸을 때만
    enabled: isOpen && keyword.trim().length > 0 && !!circleId && circleId !== 0,
    initialPageParam: null,
    getNextPageParam: () => undefined,
    gcTime: 0,
    retry: false,
  });
};