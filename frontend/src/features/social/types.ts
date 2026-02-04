import type { 
  FollowUserInfo, 
  ApiDataSuccessResponse, 
  FollowState,
  CheckCircleMemberInfo,
  ExploreCircleInfo,
  UsagePurpose
} from "../../apis/types/common";
import type { CheckFollowersData, CheckFollowingsData } from "../../apis/types/follow";

/** 1. 팔로우 요청 응답 (POST /api/users/{targetId}/follows) */
// 명세에 직접적인 Result 타입이 없으므로, FollowState를 포함한 응답 객체 정의
export interface FollowActionData {
  followId: number;
  followState: FollowState; // 'REQUESTED' | 'COMPLETED'
  createdAt: string;
}
export type FollowRequestResponse = ApiDataSuccessResponse<FollowActionData>;

/** 2. 팔로우/팔로워 리스트 UI 타입 */
export interface SocialUserItem extends FollowUserInfo {
  bio?: string;
  level?: UsagePurpose;
  badgeImage?: string;
  profileIcon?: string;
}

// 응답 래퍼
export interface SocialFollowerList extends Omit<CheckFollowersData, 'data'> {
  data: SocialUserItem[];
}
export type GetSocialFollowersResponse = ApiDataSuccessResponse<SocialFollowerList>;

export interface SocialFollowingList extends Omit<CheckFollowingsData, 'data'> {
  data: SocialUserItem[];
}
export type GetSocialFollowingsResponse = ApiDataSuccessResponse<SocialFollowingList>;

export type ApiErrorResponse = 
  | { isSuccess: boolean; code: string; message: string; data: null; }
  | { status: number; error: string; message: string; code?: string; };

/** 3. 써클 관련 타입 */
export interface CircleItem extends ExploreCircleInfo {
  description?: string;
  isPublic?: boolean;
}

export interface CircleMemberItem extends CheckCircleMemberInfo {
  role?: 'owner' | 'member';
  introduction?: string;
  profileIcon?: string;   
  badgeImage?: string;     
}

export type GetCircleMembersResponse = ApiDataSuccessResponse<{
  isLeader: boolean;
  members: CircleMemberItem[];
  hasNext: boolean;
  nextCursor: number | null;
}>;

export type GetCirclesResponse = ApiDataSuccessResponse<CircleItem[]>;

/** 🟢 써클 생성 요청 타입 (POST /api/circles) */
export interface CreateCircleRequest {
  name: string;
  description: string;
  isPublic: boolean;
  capacity: number | null; // 제한없음일 때 null
}

// 써클 생성 응답 데이터 타입 (필요 시)
export interface CreateCircleResponseData {
  circleId: number;
  createdAt: string;
}

export type GetCreateCircleResponse = ApiDataSuccessResponse<CreateCircleResponseData>;