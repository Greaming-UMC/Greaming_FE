import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse, UserInformations } from "../../../apis/types/common";

export const registerOnboardingInfo = async (params: UserInformations) => {
  const {
    followerCount,
    followingCount,
    followState,
    visibility,
    specialties,
    interests,
    ...rest
  } = params;

  const payload = {
    ...rest,
    nickname: rest.nickname,
    intro: rest.intro || "",

    specialtyTags: [...specialties.fields, specialties.style].filter(Boolean),
    interestTags: [...interests.fields, interests.style].filter(Boolean),
    usagePurpose: rest.usagePurpose,
    weeklyGoalScore: rest.weeklyGoalScore,
  };

  try {
    const { data } = await http.post<ApiResultResponse<null>>(
      ENDPOINTS.AUTH.REGISTER_INFO,
      payload
    );
    return data;
  } catch (e: any) {
    const status = e?.response?.status;
    const data = e?.response?.data;

    // 이미 정보 등록된 유저(=온보딩 완료)면 성공처럼 처리 , 오류해결 위해 일시적으로 해결해봤습니다.
    if (status === 409 && data?.code === "USER_409") {
      return {
        ...data,
        isSuccess: true, // 
      } as ApiResultResponse<null>;
    }
    throw e;
  }
};
