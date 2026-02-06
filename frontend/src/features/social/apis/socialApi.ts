import axios from 'axios';
import type { CheckFollowersParamas, CheckFollowingsParams } from '../../../apis/types/follow';
import type { 
  GetSocialFollowersResponse, 
  GetSocialFollowingsResponse,
  FollowRequestResponse,
  GetCircleMembersResponse,
  GetCirclesResponse,
  CreateCircleRequest,
  GetCreateCircleResponse
} from '../types';

/**
 * [User 관련 API]
 */

// 1. 유저 검색 (초대용: 전체 유저 대상 닉네임 검색)
export const searchUsers = async (params: { nickname: string; cursorId?: number | null; size?: number }) => {
  // 닉네임이 비어있으면 빈 결과를 반환하거나 호출하지 않도록 처리
  if (!params.nickname.trim()) return null;
  
  const response = await axios.get<GetSocialFollowersResponse>(`/api/users/search`, { params });
  return response.data;
};

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

// 1. 써클 멤버 목록 조회 (무한 스크롤 대응을 위해 params 추가)
export const getCircleMembers = async (
  circleId: number, 
  params: { cursorId?: number | null; size?: number } 
) => {
  const response = await axios.get<GetCircleMembersResponse>(`/api/circles/${circleId}/members`, { params });
  return response.data;
};

// 2. 써클 목록 조회 및 검색 (무한 스크롤 대응 가능하도록 params 타입 구체화)
export const getCircles = async (params?: { searchTerm?: string; cursorId?: number | null; size?: number }) => {
  const response = await axios.get<GetCirclesResponse>(`/api/circles`, { params });
  return response.data;
};

// 3. 써클 멤버 강퇴
export const kickCircleMember = async (circleId: number, targetUserId: number) => {
  const response = await axios.delete(`/api/circles/${circleId}/members/${targetUserId}`);
  return response.data;
};

// 4. 써클 정보 상세 조회
export const getCircleDetail = async (circleId: number) => {
  const response = await axios.get(`/api/circles/${circleId}`);
  return response.data;
};

// 5. 써클 초대 보내기
export const inviteCircleMember = async (circleId: number, targetUserId: number) => {
  const response = await axios.post(`/api/circles/${circleId}/members/invite`, { targetUserId });
  return response.data;
};

// 써클 생성 API
export const createCircle = async (data: CreateCircleRequest) => {
  const response = await axios.post<GetCreateCircleResponse>('/api/circles', data);
  return response.data;
};