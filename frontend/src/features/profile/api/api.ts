import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";

import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckUserProfileResult } from "../../../apis/types/user";
import type { 
    CheckMySubmissionsRequest, CheckMySubmissionsResult, 
    CheckUserSubmissionsRequest, CheckUserSubmissionsResult 
} from "../../../apis/types/userSubmissions";
import type { 
    CheckCircleProfileResult, 
    CheckCircleSubmissionsRequest, CheckCircleSubmissionsResult 
} from "../../../apis/types/circle";
import type { FollowRequestResult } from "../../../apis/types/follow";


export const getUserProfile = async (userId: number) => {
    const { data } = await http.get<ApiResultResponse<CheckUserProfileResult>>(
        ENDPOINTS.USER.GET_USER_PROFILE_HEADER(userId),
    );
    return data;
  };
  
export const getMySubmissions = async (params: CheckMySubmissionsRequest) => {
    const { data } = await http.get<ApiResultResponse<CheckMySubmissionsResult>>(
        ENDPOINTS.USER_SUBMISSIONS.GET_MY_SUBMISSIONS,
        { params },
    );
    return data;
};

export const getUserSubmissions = async (
    userId: number,
    params: CheckUserSubmissionsRequest,
    ) => {
    const { data } = await http.get<ApiResultResponse<CheckUserSubmissionsResult>>(
        ENDPOINTS.USER_SUBMISSIONS.GET_USER_SUBMISSIONS(userId),
        { params },
    );
    return data;
};


export const getCircleProfile = async (circleId: number) => {
    const { data } = await http.get<ApiResultResponse<CheckCircleProfileResult>>(
        ENDPOINTS.CIRCLE.GET_CIRCLE_PROFILE(circleId),
    );
    return data;
};

export const getCircleSubmissions = async (circleId: number, params: CheckCircleSubmissionsRequest) => {
    const { data } = await http.get<ApiResultResponse<CheckCircleSubmissionsResult>>(
        ENDPOINTS.CIRCLE.GET_CIRCLE_SUBMISSIONS(circleId),
        { params },
    );
    return data;
};


export const postFollowRequest = async (targetId: number) => {
    const { data } = await http.post<ApiResultResponse<FollowRequestResult>>(
        ENDPOINTS.FOLLOW.FOLLOW(targetId),
    );
    return data;
};
