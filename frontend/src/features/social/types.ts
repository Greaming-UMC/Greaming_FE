/* 타입은 다시 수정 예정 입니다. */

/**
 * 유저 관련 타입 (팔로잉/팔로워)
 */
export interface SocialUser {
  id: number;
  nickname: string;           // ActionItem의 'title'로 사용
  bio: string;                // ActionItem의 'subtitle'로 사용
  profileImageUrl?: string;   // ActionItem의 'avatar.src'로 사용
  profileIcon?: string;       // ActionItem의 'avatar'로 사용
  isFollowing: boolean;       // 팔로우 상태 여부
  badgeImage?: string;        // 뱃지 이미지 경로 또는 아이콘 이름
}

export interface GetFollowingListResponse {
  users: SocialUser[];
  totalCount: number;
  nextCursor?: number | null;
}

/**
 * 써클(Circle) 관련 타입
 */
export interface Circle {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  memberCount: number;
  maxMembers: number | 'unlimited';
  circleImageUrl?: string;
  CircleIcon?: string;
}

/**
 * 써클 생성 폼 데이터 (API 전송용)
 */
export interface CreateCircleRequest {
  name: string;
  description: string;
  isPublic: boolean;
  maxMembers: number; // 혹은 'unlimited'를 처리하는 백엔드 규격에 맞춤
}

/**
 * 써클 멤버 전용 타입
 */
export interface CircleMember {
  id: number;
  nickname: string;           // ActionItem title
  bio: string;                // #태그 #태그 형태의 문자열
  profileImageUrl?: string;   // ActionItem avatar.src
  profileIcon?: string;       // ActionItem의 'avatar'로 사용
  isFollowing: boolean;       // 내가 이 멤버를 팔로우 중인지 여부
  badgeImage?: string;        // 닉네임 옆의 초록색 뱃지 아이콘
  role?: 'owner' | 'member';  // 방장 여부 (필요 시 UI에서 왕관 아이콘 등 표시)
}