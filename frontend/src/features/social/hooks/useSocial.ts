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

// 원본 도메인 타입 임포트
import type { newCreatCircleRequest } from '../../../apis/types/circle';

/**
 * 1. 팔로우 관련 훅 (Family A - data 기반)
 */
export const useInfiniteFollowings = (userId: number, size: number = 10) => 
  useInfiniteScroll(['followings', userId], (params) => getFollowings(userId, params), size);

export const useInfiniteFollowers = (userId: number, size: number = 10) => 
  useInfiniteScroll(['followers', userId], (params) => getFollowers(userId, params), size);

export const useFollowAction = () => {
  const queryClient = useQueryClient();

  const invalidateSocialData = () => {
    queryClient.invalidateQueries({ queryKey: ['followings'] });
    queryClient.invalidateQueries({ queryKey: ['followers'] });
    queryClient.invalidateQueries({ queryKey: ['circleMembers'] });
    queryClient.invalidateQueries({ queryKey: ['searchUsers'] });
  };

  const followMutation = useMutation({ mutationFn: followUser, onSuccess: invalidateSocialData });
  const unfollowMutation = useMutation({ mutationFn: unfollowUser, onSuccess: invalidateSocialData });

  return { followMutation, unfollowMutation };
};

/**
 * 2. 써클 관련 훅 (Family B - result 기반)
 */

// 🟢 써클 목록 조회 및 검색 (페이지 번호 기반 무한 스크롤)
export const useInfiniteCircles = (keyword: string = '', size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['circles', keyword],
    queryFn: ({ pageParam = 1 }) => getCircles({ keyword, page: pageParam as number, size }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const result = lastPage.result;
      if (!result) return undefined;

      const nextPage = allPages.length + 1;
      // 백엔드 명세의 totalPage와 현재 페이지 수 비교
      return nextPage <= result.totalPage ? nextPage : undefined;
    },
  });
};

// ⭕ 써클 멤버 목록 조회 (단발성 조회)
export const useCircleMembers = (circleId: number) => {
  return useInfiniteQuery({
    queryKey: ['circleMembers', circleId],
    queryFn: () => getCircleMembers(circleId),
    enabled: !!circleId,
    initialPageParam: null,
    getNextPageParam: () => undefined, 
  });
};

// 🟢 써클 생성 훅
export const useCreateCircle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: newCreatCircleRequest) => createCircle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circles'] });
    },
  });
};

// ❌ 써클 멤버 강퇴 훅
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

// 🔎 초대 유저 검색 (ExploreUsersRequest 객체 구조 반영)
export const useSearchUsers = (circleId: number, keyword: string) => {
  return useInfiniteQuery({
    queryKey: ['searchUsers', circleId, keyword],
    // keyword를 객체로 감싸서 전달하여 타입 에러 해결
    queryFn: () => searchUsersForInvite(circleId, { keyword }), 
    enabled: keyword.trim().length > 0,
    initialPageParam: null,
    getNextPageParam: () => undefined,
    gcTime: 0, 
  });
};