import type { ProfileInterceptor } from '../common';
import axios from 'axios';

/**
 * 내 프로필 정보 (GET /api/users/me)
 * URI: /api/users/me
 */


// Response
// ApiResultSuccessResponse<CheckMyProfileResult>
export type CheckMyProfileResult = ProfileInterceptor;

export type UserInformation = {
  nickname: string;
  profileImgUrl: string;
  level: string;     
  introduction: string;      
  followerCount: number;
  followingCount: number;
  specialtyTags: string[];   
  interestTags: string[];    
};

export interface ChallengeCalendar {
  dailyChallenge: string[];
  weeklyChallenge: string[];
}

// 전체 응답 구조
export interface UserProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    userInformation: UserInformation;
    challengeCalendar: ChallengeCalendar;
  };
}

// API 프로필 조회 요청 함수
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await axios.get('/api/users/me'); 
  return response.data;
};