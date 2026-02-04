import axios from 'axios';
import type { CheckFollowersParamas, CheckFollowingsParams } from '../../../apis/types/follow';
import type { 
  GetSocialFollowersResponse, 
  GetSocialFollowingsResponse,
  FollowRequestResponse,
  GetCircleMembersResponse,
  GetCirclesResponse
} from '../types';

/**
 * [Follow 관련 API]
 */
export const getFollowers = async (userId: number, params: CheckFollowersParamas) => {
  const response = await axios.get<GetSocialFollowersResponse>(`/api/users/${userId}/followers`, { params });
  return response.data;
};

export const getFollowings = async (userId: number, params: CheckFollowingsParams) => {
  const response = await axios.get<GetSocialFollowingsResponse>(`/api/users/${userId}/followings`, { params });
  return response.data;
};

export const followUser = async (targetId: number) => {
  const response = await axios.post<FollowRequestResponse>(`/api/users/${targetId}/follows`);
  return response.data;
};

export const unfollowUser = async (targetId: number) => {
  const response = await axios.delete(`/api/users/${targetId}/follows`);
  return response.data;
};

/**
 * [Circle 관련 API] 
 */

// 1. 써클 멤버 목록 조회 (GET)
// 응답: { isLeader: boolean, members: CircleMemberItem[] }
export const getCircleMembers = async (circleId: number) => {
  const response = await axios.get<GetCircleMembersResponse>(`/api/circles/${circleId}/members`);
  return response.data;
};

// 2. 써클 목록 조회 및 검색 (GET)
// 쿼리 파라미터로 검색어(searchTerm) 등을 받을 수 있음
export const getCircles = async (params?: { searchTerm?: string }) => {
  const response = await axios.get<GetCirclesResponse>(`/api/circles`, { params });
  return response.data;
};

// 3. 써클 멤버 강퇴 (DELETE)
// 방장(Leader) 권한이 있을 때 특정 유저를 써클에서 제거
export const kickCircleMember = async (circleId: number, targetUserId: number) => {
  const response = await axios.delete(`/api/circles/${circleId}/members/${targetUserId}`);
  return response.data;
};

// 4. 써클 정보 상세 조회 (필요 시)
export const getCircleDetail = async (circleId: number) => {
  const response = await axios.get(`/api/circles/${circleId}`);
  return response.data;
};