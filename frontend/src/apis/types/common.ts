export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}










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
// CheckSettings
// ====================================================
// visibillty 타입
export type Visibillty = 'PUBLIC' | 'PRIVATE' | 'PROTECTED';

// profile settings interface
export interface ProfileSettings {
  nickname: string;
  profileImgUrl: string;
  level: UsagePurpose;
  introduction: string;
  followerCount: number;
  followingCount: number;
  specialtyTags: string[];
  interestTags: string[];
}



// ====================================================
// Works
// ====================================================
// 작품 메타데이터 타입
export interface WorkMetadata {
  workId: number;
  thumbnailUrl: string;
  likesCount: number;
  commentCount: number;
  bookmarkCount: number;
  isLiked: boolean;
}

// 작품 조회 타입 및 요청 인터페이스
export type WorkType = 'ALL' | 'DAYLY' | 'WEEKLY';
export interface WorkRequestType {
  type: WorkType;
  page: number;
  size: number;
};


// 프로필 헤더 정보 타입
export interface ProfileHeaderResult {
  userInformation: {
    nickname: string;
    profileImgUrl: string;
    level: UsagePurpose;
    introduction: string;
    followerCount: number;
    followingCount: number;
    specialtyTags: string[];
    interestTags: string[];
  };
  challengeCalender: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  }
}
