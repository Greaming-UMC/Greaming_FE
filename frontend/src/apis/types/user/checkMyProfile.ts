import type {
  ApiResultResponse,
  FollowState,
  UsagePurpose,
  VisibilityType,
} from "../common";

/**
 * 내 프로필 정보 (GET /api/users/me)
 * URI: /api/users/me
 */
export type UserInformation = {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  journeyLevel?: UsagePurpose;
  level?: UsagePurpose;
  introduction: string;
  followerCount: number;
  followingCount: number;
  specialtyTags: string[];
  interestTags: string[];
  weeklyGoalScore?: number;
  followState?: FollowState;
  visibility?: VisibilityType;
};

export type CheckMyProfileResult = {
  user_information?: UserInformation;
  userInformation?: UserInformation;
  challenge_calender?: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
  challengeCalendar?: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
};

export type CheckMyProfileResponse = ApiResultResponse<CheckMyProfileResult>;

// 호환성 유지용 alias
export type UserProfileResponse = CheckMyProfileResponse;
