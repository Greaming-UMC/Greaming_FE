import axios from 'axios';
import { ENDPOINTS } from '../../../libs/http/endpoints/endpoints';

// 1. 공통 및 도메인별 타입 임포트
import type { 
  ApiDataSuccessResponse, 
  ApiResultResponse,
} from '../../../apis/types/common';

import type { 
  CheckFollowersData, 
  CheckFollowingsData, 
  CheckFollowersParamas, 
  CheckFollowingsParams,
  FollowRequestResult,
  RejectionAcceptData
} from '../../../apis/types/follow';

import type { 
  CheckCircleMembersResult, 
  ExploreCircleResult, 
  ExploreUsersResult, 
  kickCircleMembersResult, 
  newCreatCircleRequest, 
  newCreatCircleResult,
  ExploreCircleRequest,
  ExploreUsersRequest,
  CheckCircleProfileResult,
  editCircleSettingsRequest,
  editCircleSettingsResult
} from '../../../apis/types/circle';

/**
 * [Follow 관련 API]
 */

// 팔로워 목록 조회 (Family A: ApiDataSuccessResponse)
export const getFollowers = async (userId: number, params: CheckFollowersParamas) => {
  const response = await axios.get<ApiDataSuccessResponse<CheckFollowersData>>(
    ENDPOINTS.FOLLOW.GET_FOLLOWERS(userId), 
    { params }
  );
  return response.data;
};

// 팔로잉 목록 조회 (Family A: ApiDataSuccessResponse)
export const getFollowings = async (userId: number, params: CheckFollowingsParams) => {
  const response = await axios.get<ApiDataSuccessResponse<CheckFollowingsData>>(
    ENDPOINTS.FOLLOW.GET_FOLLOWINGS(userId), 
    { params }
  );
  return response.data;
};

// 팔로우 요청 (Family A 규격 대응)
export const followUser = async (targetId: number) => {
  const response = await axios.post<ApiDataSuccessResponse<FollowRequestResult>>(
    ENDPOINTS.FOLLOW.FOLLOW(targetId)
  );
  return response.data;
};

// 언팔로우 (특정 유저 제거)
export const unfollowUser = async (targetId: number) => {
  const response = await axios.delete<ApiDataSuccessResponse<null>>(
    ENDPOINTS.FOLLOW.UNFOLLOW(targetId)
  );
  return response.data;
};

// 팔로우 요청 수락
export const acceptFollowRequest = async () => {
  const response = await axios.post<ApiDataSuccessResponse<RejectionAcceptData>>(
    ENDPOINTS.FOLLOW.ACCEPT_FOLLOW_REQUEST
  );
  return response.data;
};

/**
 * [Circle 관련 API]
 */

// 1. 써클 멤버 목록 조회 (Family A: ApiResultResponse)
export const getCircleMembers = async (circleId: number) => {
  const response = await axios.get<ApiResultResponse<CheckCircleMembersResult>>(
    ENDPOINTS.CIRCLE.GET_MEMBERS(circleId)
  );
  return response.data;
};

// 2. 써클 목록 검색 (ExploreCircleResult 적용)
export const getCircles = async (params: ExploreCircleRequest) => {
  const response = await axios.get<ApiResultResponse<ExploreCircleResult>>(
    ENDPOINTS.CIRCLE.SEARCH, 
    { params: { 
        keyword: params.keyword, 
        page: params.page, 
        size: params.size 
      } 
    }
  );
  return response.data;
};

// 3. 써클 멤버 강퇴
export const kickCircleMember = async (circleId: number, memberId: number) => {
  const response = await axios.delete<ApiResultResponse<kickCircleMembersResult>>(
    ENDPOINTS.CIRCLE.KICK_MEMBER(circleId, memberId)
  );
  return response.data;
};

// 4. 새로운 써클 생성
export const createCircle = async (data: newCreatCircleRequest) => {
  const response = await axios.post<ApiResultResponse<newCreatCircleResult>>(
    ENDPOINTS.CIRCLE.CREATE, 
    data
  );
  return response.data;
};

// 5. 써클 정보 상세 조회
export const getCircleProfile = async (circleId: number) => {
  const response = await axios.get<ApiResultResponse<CheckCircleProfileResult>>(
    ENDPOINTS.CIRCLE.GET_CIRCLE_PROFILE(circleId)
  );
  return response.data;
};

// 6. 써클 설정 수정
export const updateCircleSettings = async (circleId: number, data: editCircleSettingsRequest) => {
  const response = await axios.put<ApiResultResponse<editCircleSettingsResult>>(
    ENDPOINTS.CIRCLE.UPDATE(circleId),
    data
  );
  return response.data;
};

// 7. 초대 유저 검색 (ExploreUsersResult 적용)
export const searchUsersForInvite = async (circleId: number, params: ExploreUsersRequest) => {
  const response = await axios.get<ApiResultResponse<ExploreUsersResult>>(
    ENDPOINTS.CIRCLE.SEARCH_USER(circleId),
    { params }
  );
  return response.data;
};