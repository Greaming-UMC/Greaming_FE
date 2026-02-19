import type {
  ApiResultResponse,
  FollowState,
  UsagePurpose,
  VisibilityType,
} from "../common";

/**
 * 유저 프로필정보 (GET /api/users/{userId}/info)
 * URI: /api/users/{userId}/info
 */


export type OtherUserInformation = {
  userId?: number;
  nickname: string;
  profileImgUrl: string;
  journeyLevel?: UsagePurpose;
  level?: UsagePurpose;
  introduction: string;
  followerCount: number;
  followingCount: number;
  specialtyTags: string[];
  interestTags: string[];
  followState?: FollowState;
  isFollowing?: boolean;
  visibility?: VisibilityType;
};

export type CheckUserProfileResult = {
  user_information?: OtherUserInformation;
  userInformation?: OtherUserInformation;
  challenge_calender?: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
  challengeCalendar?: {
    dailyChallenge: string[];
    weeklyChallenge: string[];
  };
};

export type CheckUserProfileResponse = ApiResultResponse<CheckUserProfileResult>;
