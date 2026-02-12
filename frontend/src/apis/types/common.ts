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

// 예술 분야 한글 매핑
export const ART_FIELD_LABEL: Record<ArtField, string> = {
  ILLUSTRATION: '일러스트',
  CHARACTER: '캐릭터',
  LANDSCAPE: '풍경',
  PORTRAIT: '인물화',
  DAILY: '일상',
  INSTATOON: '인스타툰',
  FANTASY: '판타지',
  ABSTRACT: '추상화',
  ANIMATION: '애니메이션',
  WATERCOLOR: '수채화',
  ARCHITECTURE: '건축',
  PENCIL: '연필',
  ANIMAL: '동물',
  TRADITIONAL: '동양화',
  FAN_ART: '팬아트',
  FLOWER: '꽃',
  FOOD: '음식',
  CROQUIS: '크로키',
};

// 예술 스타일 한글 매핑
export const ART_STYLE_LABEL: Record<ArtStyle, string> = {
  COLOR: '컬러',
  BLACK_AND_WHITE: '흑백',
  CUTE: '귀여운',
  HORROR: '공포',
  DETAILED: '디테일',
  SIMPLE: '심플',
};

// ====================================================
// Account & Profile
// ====================================================
// visibility 타입
export type VisibilityType = 'PUBLIC' | 'PRIVATE' | 'PROTECTED';

export type UserInformations = {
  nickname: string;
  profileImgUrl: string;
  intro: string;            
  usagePurpose: UsagePurpose; 
  weeklyGoalScore: number;    // 명세서에 있는 주간 목표 점수 추가
  specialties: {
    fields: ArtField[]; // 여러 개 선택 가능한 분야
    style: string;      // 하나만 선택하는 스타일
  };
  interests: {
    fields: ArtField[]; 
    style: string;      
  };
  followerCount: number;
  followingCount: number;
  followState?: FollowState;
  visibility?: VisibilityType;
};

// 프로필 헤더 정보 타입
export type ProfileInterceptor = {
  user_information?: UserInformations;
  userInformation?: UserInformations;
  challenge_calender?: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
  challengeCalendar?: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
};

// ====================================================
// Submissions
// ====================================================
// 작품 종류
export type CheckSubmissionType = 'ALL' | 'PERSONAL';

// 정렬 기준 (sortBy):
// latest: 최신순 (기본값)
// popular: 인기순 (좋아요 많은 순)
// bookmarks: 북마크 많은 순
// recommend: 추천순 (좋아요2 + 댓글3 + 북마크*5)
export type SortBy = 'latest' | 'popular' | 'bookmarks' | 'recommend';

// 페이지 사이즈:
// 기본값: 50
// 최소: 1
// 최대: 50
export type PageSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;

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
  title?: string;
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

// 스웨거 list 카드(홈 그리드/챌린지 목록 공통)
export type SubmissionListItemDto = {
  submissionId: number;
  thumbnailUrl: string;
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
};

export type PageInfo = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  isLast: boolean;
  isFirst: boolean;
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
