import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { 
  getFollowers, 
  getFollowings, 
  followUser, 
  unfollowUser, 
  getCircleMembers, 
  kickCircleMember,
  getCircles, // 써클 검색용 추가
  searchUsers,
  createCircle
} from '../apis/socialApi';
import type { 
  GetSocialFollowersResponse, 
  GetSocialFollowingsResponse,
  GetCircleMembersResponse,
  GetCirclesResponse,
  ApiErrorResponse, 
  CreateCircleRequest
} from '../types';

// 1. 🟢 팔로잉 목록 무한 스크롤
export const useInfiniteFollowings = (userId: number, size: number = 10) => {
  return useInfiniteQuery<GetSocialFollowingsResponse, ApiErrorResponse>({
    queryKey: ['followings', userId],
    queryFn: ({ pageParam = null }) => 
      getFollowings(userId, { cursorId: pageParam as number | null, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data?.hasNext || lastPage.data.nextCursor === null) return undefined;
      return Number(lastPage.data.nextCursor);
    },
  });
};

// 2. 🟢 팔로워 목록 무한 스크롤
export const useInfiniteFollowers = (userId: number, size: number = 10) => {
  return useInfiniteQuery<GetSocialFollowersResponse, ApiErrorResponse>({
    queryKey: ['followers', userId],
    queryFn: ({ pageParam = null }) => 
      getFollowers(userId, { cursorId: pageParam as number | null, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data?.hasNext || lastPage.data.nextCursor === null) return undefined;
      return Number(lastPage.data.nextCursor);
    },
  });
};

// 3. 🟢 팔로우/언팔로우 액션 훅 (무효화 범위 확장)
export const useFollowAction = () => {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['circleMembers'] }); // 👈 써클 멤버 목록 내 팔로우 상태 동기화
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followings'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['circleMembers'] });
    },
  });

  return { followMutation, unfollowMutation };
};

// 4. 🟢 써클 멤버 목록 무한 스크롤 (useQuery -> useInfiniteQuery 수정)
export const useInfiniteCircleMembers = (circleId: number, size: number = 10) => {
  return useInfiniteQuery<GetCircleMembersResponse, ApiErrorResponse>({
    queryKey: ['circleMembers', circleId],
    queryFn: ({ pageParam = null }) => 
      getCircleMembers(circleId, { cursorId: pageParam as number | null, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      // Family A 구조: data.hasNext가 true일 때만 nextCursor 반환
      if (!lastPage.data?.hasNext || lastPage.data.nextCursor === null) return undefined;
      return Number(lastPage.data.nextCursor);
    },
    enabled: !!circleId,
  });
};

// 5. 🟢 써클 검색/조회 무한 스크롤
export const useInfiniteCircles = (searchTerm: string, size: number = 10) => {
  return useInfiniteQuery<GetCirclesResponse, ApiErrorResponse>({
    queryKey: ['circles', searchTerm],
    queryFn: ({ pageParam = null }) => 
      getCircles({ searchTerm, cursorId: pageParam as number | null, size }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      // API 명세상 Circle 응답도 동일한 페이징 구조를 가진다고 가정
      if (!lastPage.data || lastPage.data.length < size) return undefined; 
      // 만약 써클 목록도 커서가 있다면 위 팔로잉 로직과 동일하게 작성
      return undefined; // 우선 단발성 조회로 설정 (필요시 커서 로직 추가)
    },
  });
};

// 6. 🟢 써클 멤버 강퇴 훅
export const useKickMember = (circleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) => kickCircleMember(circleId, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circleMembers', circleId] });
    },
  });
};

// 7. 초대하기 유저 검색 무한 스크롤 훅
export const useSearchUsers = (nickname: string, size: number = 10) => {
  return useInfiniteQuery<GetSocialFollowersResponse, ApiErrorResponse>({
    queryKey: ['searchUsers', nickname],
    queryFn: async ({ pageParam }) => {
      const response = await searchUsers({ 
        nickname, 
        cursorId: pageParam as number | null, 
        size 
      });
      // searchUsers가 null을 반환할 수 있다면 기본 객체 구조를 반환하여 에러 방지
      return response ?? { isSuccess: true, code: "200", message: "", data: { data: [], hasNext: false, nextCursor: null } };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      // API 응답의 data 필드가 CheckFollowersData 구조인지 확인 필요
      if (!lastPage.data?.hasNext || lastPage.data.nextCursor === null) return undefined;
      return Number(lastPage.data.nextCursor);
    },
    enabled: nickname.trim().length > 0, // 공백 제외 한 글자라도 있을 때만
    // 💡 검색어가 바뀔 때 이전 데이터를 유지하지 않고 새로고침
    gcTime: 0, 
  });
};

// 8. 🟢 써클 생성 훅
export const useCreateCircle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCircleRequest) => createCircle(data),
    onSuccess: () => {
      // 써클 목록 무한 스크롤 데이터 무효화 (목록 새로고침)
      queryClient.invalidateQueries({ queryKey: ['circles'] });
    },
  });
};