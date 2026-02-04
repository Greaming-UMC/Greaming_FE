// ====================================================
// Response
// ====================================================
// [Family A] isSuccess, code, message 가 무조건 있음
interface BaseLogicResponse {
  isSuccess: boolean;
  code: string;
  message: string;
};

export interface ApiResultResponse<T> extends BaseLogicResponse {
  result: T | null;
};

export interface ApiDataSuccessResponse<T> extends BaseLogicResponse {
  data: T | null;
};

// [Family B] status, message 가 있음 (code는 있을 수도 없을 수도)
interface BaseStatusResponse {
  status: number;
  message: string;
};

export interface ApiStatusResponse<T> extends BaseStatusResponse {
  data: T | null;
};

// 실패 케이스 통합 (Catch 문에서 사용)
export type ApiErrorResponse =
  // 1. [Family A] 비즈니스 로직 에러 (예: 이미 팔로우 중 - 409)
  | {
      isSuccess: boolean; // false
      code: string; // "FOLLOW_409"
      message: string;
      data: null; // 실패해서 데이터 없음
    }

  // 2. [Family B] 인증/유효성 에러 (예: 400, 401)
  | {
      status: number; // 400, 401
      error: string; // "BAD_REQUEST", "UNAUTHORIZED"
      message: string;
      code?: string; // 400엔 있고("SUBMISSION_4001"), 401엔 없음 -> Optional(?) 필수!
    };

// ====================================================
// Onboarding
// ====================================================
// 사용 목적 (SKETCHER, PAINTER, ARTIST, MASTER)
export type UsagePurpose =
  | 'SKETCHER'
  | 'PAINTER'
  | 'ARTIST'
  | 'MASTER';

// 예술 분야 (ILLUSTRATION, CHARACTER 등)
export type ArtField =
  | 'ILLUSTRATION' | 'CHARACTER' | 'LANDSCAPE' | 'PORTRAIT'
  | 'DAILY' | 'INSTATOON' | 'FANTASY' | 'ABSTRACT'
  | 'ANIMATION' | 'WATERCOLOR' | 'ARCHITECTURE' | 'PENCIL'
  | 'ANIMAL' | 'TRADITIONAL' | 'FAN_ART' | 'FLOWER'
  | 'FOOD' | 'CROQUIS';

// 예술 스타일 (COLOR, BLACK_AND_WHITE 등)
export type ArtStyle =
  | 'COLOR' | 'BLACK_AND_WHITE' | 'CUTE'
  | 'HORROR' | 'DETAILED' | 'SIMPLE';

// ====================================================
// Account & Profile
// ====================================================
// visibility 타입
export type VisibilityType = 'PUBLIC' | 'PRIVATE' | 'PROTECTED';

// userInfo
export type UserInformations = {
  nickname: string;
  profileImgUrl: string;
  level: UsagePurpose;
  introduction: string;
  followerCount: number;
  followingCount: number;
  specialtyTags: string[];
  interestTags: string[];
  followState?: FollowState;
  visibility?: VisibilityType;
};

// 프로필 헤더 정보 타입
export type ProfileInterceptor = {
  user_information: UserInformations;
  challenge_calender: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
};

// ====================================================
// Submissions
// ====================================================
// 작품 종류
export type CheckSubmissionType = 'ALL' | 'PERSONAL';
export type SortBy = 'LATEST' | 'POPULAR' | 'RECOMMEND';

// 작품 삽입/삭제/갱신 요청 타입
export type ActionSubmissionInterceptor = {
  title?: string | null;
  caption?: string | null;
  tags?: string[] | null;
  imageUrls?: string[] | null;
};

// 작품 삽입/삭제/갱신 응답 타입
export type ActionSubmissionsResult = {
  submissionId: number;
  uploaded_at: string;
};

// 작품 카운터 데이터
export type SubmissionCounters = {
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
};

// 작품 메타데이터 타입
export type SubmissionMetadata = {
  submissionId: number;
  thumbnailUrl: string;
  counters: SubmissionCounters;
  isLiked: boolean;
};

// 메타데이터에 없어서 추가한 홈 카드 타입
export interface HomeCardType extends SubmissionMetadata {
  title: string;
  nickname: string;
  profileImgUrl: string;
}

// 작품 조회 타입 및 요청 인터페이스
export type CheckMySubmissionType = 'ALL' | 'SAVED';
export interface CheckSubmissionInterceptor {
  type?: CheckMySubmissionType | null;
  page?: number | null;
  size?: number | null;
};

// ====================================================
// UploadSubmission
// ====================================================
// 게시물 타입
export type UploadSubmissionType = 'GENERAL' | 'DAILY' | 'WEEKLY' | 'CIRCLE';

// ====================================================
// Follow
// ====================================================
export type FollowState = 'REQUESTED' | 'COMPLETED';

// 공통 유저 정보 타입
export interface BaseUserInfo {
  userId: number;
  nickname: string;
  profileImgUrl: string;
};

// 팔로워/팔로잉 유저 정보 타입
export interface FollowUserInfo extends BaseUserInfo {
  isFollowing: boolean;
  followState: FollowState;
};

// ====================================================
// Circle
// ====================================================
// 써클 탐색 유저 정보 타입
export interface ExploreCircleUserInfo extends BaseUserInfo {
  level: UsagePurpose;
  tags: string[];
  isInvited: boolean;
  isMember: boolean;
};

// 써클 구성원(유저) 정보 타입
export interface CheckCircleMemberInfo extends BaseUserInfo {
  level: UsagePurpose;
  tags: string[];
  isFollowing: boolean;
};

export interface ExploreCircleInfo {
  circleId: number;
  name: string;
  profileUrl: string;
  memberCount: number;
  capacity: number;
  isJoined: boolean;
  isFull: boolean;
};

// 써클 작품 메타데이터 타입
export interface CircleSubmissionMetadata {
  submissionId: number;
  thumbnail_Url: string;
  artist_name: string;
  profile_Url: string;
  counters: SubmissionCounters;
  isLiked: boolean;
};
