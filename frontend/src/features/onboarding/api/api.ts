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

    // ✅ 이미 정보 등록된 유저(=온보딩 완료)면 성공처럼 처리
    // 서버 응답 예: { isSuccess:false, code:"USER_409", message:"이미 정보가 등록된 유저입니다." }
    if (status === 409 && data?.code === "USER_409") {
      return {
        ...data,
        isSuccess: true, // ✅ 프론트에서는 성공으로 취급
      } as ApiResultResponse<null>;
    }

    // ✅ (임시) 서버 게이트웨이 장애(502)면 "일단 통과" 처리
  if (status === 502) {
    return {
      isSuccess: true,
      code: "GATEWAY_502",
      message: "서버 응답이 불안정하지만 계속 진행합니다.",
      result: null,
    } as ApiResultResponse<null>;
  }

    throw e;
  }
};
