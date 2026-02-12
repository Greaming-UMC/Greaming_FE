import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse, UserInformations } from "../../../apis/types/common";
import type { RegisterInfoRequest } from "../../../apis/types/auth";

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


    const payload: RegisterInfoRequest = {
        nickname: rest.nickname,
        intro: rest.intro || "",
        specialtyTags: [...specialties.fields, specialties.style].filter(Boolean),
        interestTags: [...interests.fields, interests.style].filter(Boolean),
        usagePurpose: rest.usagePurpose,
        weeklyGoalScore: rest.weeklyGoalScore,
    };

    const { data } = await http.post<ApiResultResponse<null>>(
        ENDPOINTS.AUTH.REGISTER_INFO,
        payload
    );
    return data;
};
