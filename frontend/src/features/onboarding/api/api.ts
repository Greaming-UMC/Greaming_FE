import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse, UserInformations } from "../../../apis/types/common";
import type { RegisterInfoRequest } from "../../../apis/types/auth";
import type { CheckNicknameResult } from "../../../apis/types/profileSettings";

export const registerOnboardingInfo = async (params: UserInformations) => {
    const { 
        followerCount, 
        followingCount, 
        followState, 
        visibility,
        specialtyTags, 
        interestTags,   
        ...rest 
    } = params;


    const payload: RegisterInfoRequest = {
        nickname: rest.nickname,
        intro: rest.introduction || "",
        specialtyTags: specialtyTags || [], 
        interestTags: interestTags || [],
        usagePurpose: rest.journeyLevel, 
        weeklyGoalScore: rest.weeklyGoalScore ?? 0,
    };

    const { data } = await http.post<ApiResultResponse<null>>(
        ENDPOINTS.AUTH.REGISTER_INFO,
        payload
    );
    return data;
};

/**
 * 닉네임 중복 확인
 * @param nickname 중복 확인할 닉네임
 */
export const checkNickname = async (nickname: string) => {
    const { data } = await http.get<ApiResultResponse<CheckNicknameResult>>(
        ENDPOINTS.PROFILE_SETTINGS.CHECK_NICKNAME,
        { params: { nickname } }
    );
    return data;
};
