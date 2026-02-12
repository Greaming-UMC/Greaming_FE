import { http } from "../libs/http/client";
import { ENDPOINTS } from "../libs/http/endpoints/endpoints";
import type { CheckMyProfileResponse } from "./types/user";

// 공용 API 함수: 헤더/공통 영역에서 내 프로필 요약 조회
export const getMyProfileHeader = async (): Promise<CheckMyProfileResponse> => {
  const { data } = await http.get<CheckMyProfileResponse>(
    ENDPOINTS.USER.GET_MY_PROFILE_HEADER,
  );
  return data;
};
