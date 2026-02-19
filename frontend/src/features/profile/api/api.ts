import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";

import type {
    ApiResultResponse,
    CheckSubmissionInterceptor,
} from "../../../apis/types/common";
import type { CheckUserProfileResult } from "../../../apis/types/user";
import type {
    GetUserSubmissionsResult,
} from "../../../apis/types/submission/getUserSubmissions";
import type { 
    CheckCircleProfileResult, 
    CheckCircleSubmissionsRequest, CheckCircleSubmissionsResult 
} from "../../../apis/types/circle";
import type { ToggleFollowResult } from "../../../apis/types/follow";
import type {
    GetFollowersParams,
    GetFollowersResult,
    GetFollowingsParams,
    GetFollowingsResult,
} from "../../../apis/types/follow";


export const getUserProfile = async (userId: number) => {
    const { data } = await http.get<ApiResultResponse<CheckUserProfileResult>>(
        ENDPOINTS.USER.GET_USER_PROFILE_HEADER(userId),
    );
    return data;
  };

export const getUserSubmissions = async (
    userId: number,
    params: CheckSubmissionInterceptor,
    ) => {
    const { data } = await http.get<ApiResultResponse<GetUserSubmissionsResult>>(
        ENDPOINTS.SUBMISSION.GET_USER_SUBMISSIONS(userId),
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
    const { data } = await http.post<ApiResultResponse<ToggleFollowResult>>(
        ENDPOINTS.FOLLOW.TOGGLE(targetId),
    );
    return data;
};

export const deleteFollowRequest = async (targetId: number) => {
    const { data } = await http.delete<ApiResultResponse<null>>(
        ENDPOINTS.FOLLOW.UNFOLLOW(targetId),
    );
    return data;
};

export const getFollowers = async (
    userId: number,
    params: GetFollowersParams = {},
) => {
    const { data } = await http.get<ApiResultResponse<GetFollowersResult>>(
        ENDPOINTS.FOLLOW.GET_FOLLOWERS(userId),
        { params },
    );
    return data;
};

export const getFollowings = async (
    userId: number,
    params: GetFollowingsParams = {},
) => {
    const { data } = await http.get<ApiResultResponse<GetFollowingsResult>>(
        ENDPOINTS.FOLLOW.GET_FOLLOWINGS(userId),
        { params },
    );
    return data;
};
