import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse, ProfileInterceptor } from "../common";

/**
 * 내 프로필 정보 (GET /api/users/me)
 * URI: /api/users/me
 */
export type CheckMyProfileResult = ProfileInterceptor;
export type CheckMyProfileResponse = ApiResultResponse<CheckMyProfileResult>;

// 호환성 유지용 alias
export type UserProfileResponse = CheckMyProfileResponse;

// 공용 API 함수: 헤더/공통 영역에서 내 프로필 요약 조회
export const getMyProfileHeader = async (): Promise<CheckMyProfileResponse> => {
  const { data } = await http.get<CheckMyProfileResponse>(
    ENDPOINTS.USER.GET_MY_PROFILE_HEADER,
  );
  return data;
};

// 기존 호출부 호환성 유지
export const getUserProfile = getMyProfileHeader;
