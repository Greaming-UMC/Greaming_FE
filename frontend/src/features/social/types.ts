/**
 * 유저 관련 타입 (팔로잉/팔로워)
 */
export interface SocialUser {
  id: number;
  nickname: string;           // ActionItem의 'title'로 사용
  bio: string;                // ActionItem의 'subtitle'로 사용
  profileImageUrl?: string;   // ActionItem의 'avatar.src'로 사용
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
 * CircleFormSection 컴포넌트 Props 타입
 */
export interface CircleFormSectionProps {
  circleName: string;
  setCircleName: (val: string) => void;
  circleDescription: string;
  setCircleDescription: (val: string) => void;
  isPublic: boolean;
  setIsPublic: (val: boolean) => void;
}