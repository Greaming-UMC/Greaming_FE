/**
 * 프로필 설정 수정   (PUT /api/users/me/profile)
 * URI: /api/users/me/profile
 */

// Request
export interface EditProfileSettingsParams {
  nickname: string;
  intro: string;
  journeyLevel: "SKETCHER" | "PAINTER" | "ARTIST" | "MASTER";
  profileImageKey: string;
  weeklyGoalScore: number;
  specialtyTags: string[];
  interestTags: string[];
}


// Response
// ./common.ts 에서 ApiResultSuccessResponse<T> 사용
export type EditProfileSettingsResult = {
    user_information: {
      nickname: string;
      profileImgUrl: string;
      journeyLevel: "SKETCHER" | "PAINTER" | "ARTIST" | "MASTER";
      introduction: string;
      followerCount: number;
      followingCount: number;
      specialtyTags: string[];
      interestTags: string[];
      weeklyGoalScore?: number;
    };
};
