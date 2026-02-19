import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "../../../apis/types/common";
import type { RegisterInfoRequest } from "../../../apis/types/auth/onboarding";
import type { OnboardingDraft } from "../model/useOnboardingSteps";

export const registerOnboardingInfo = async (params: OnboardingDraft) => {
  const {
    specialties,
    interests,
  } = params;

  const payload: RegisterInfoRequest = {
    nickname: params.nickname,
    intro: params.intro || "",
    specialtyTags: [...specialties.fields, specialties.style].filter(Boolean),
    interestTags: [...interests.fields, interests.style].filter(Boolean),
    journeyLevel: params.usagePurpose ?? "SKETCHER",
    weeklyGoalScore: params.weeklyGoalScore,
    ...(params.profileImgUrl ? { profileImageKey: params.profileImgUrl } : {}),
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

    // 이미 정보 등록된 유저라면 PATCH로 실제 정보를 갱신한다.
    if (status === 409 && data?.code === "USER_409") {
      const { data: patched } = await http.patch<ApiResultResponse<null>>(
        ENDPOINTS.USER.UPDATE_INFO,
        payload
      );
      return patched;
    }
    throw e;
  }
};
