import type {
  ApiResultResponse,
  ProfileInterceptor,
  UserInformations,
} from "../common";

/**
 * 내 프로필 정보 (GET /api/users/me)
 * URI: /api/users/me
 */
export type MyProfileUserInformation = UserInformations & {
  userId: number;
};

export type CheckMyProfileResult = Omit<
  ProfileInterceptor,
  "user_information" | "userInformation"
> & {
  user_information?: MyProfileUserInformation;
  userInformation?: MyProfileUserInformation;
};
export type CheckMyProfileResponse = ApiResultResponse<CheckMyProfileResult>;

// 호환성 유지용 alias
export type UserProfileResponse = CheckMyProfileResponse;
