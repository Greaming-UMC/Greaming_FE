import { http } from "../../../libs/http/client";

import type { ApiResultResponse } from "../../../apis/types/common";
import type { CheckMyProfileResult, CheckUserProfileResult } from "../../../apis/types/user";
import type { 
    CheckMySubmissionsRequest, CheckMySubmissionsResult, 
    CheckUserSubmissionsRequest, CheckUserSubmissionsResult 
} from "../../../apis/types/userSubmissions";
import type { 
    CheckCircleProfileResult, 
    CheckCircleSubmissionsRequest, CheckCircleSubmissionsResult 
} from "../../../apis/types/circle";
import type { FollowRequestResult } from "../../../apis/types/follow";


export const getMyProfile = async () => {
    const { data } = await http.get<ApiResultResponse<CheckMyProfileResult>>("/users/me");
    return data;
};

export const getUserProfile = async (userId: number) => {
    const { data } = await http.get<ApiResultResponse<CheckUserProfileResult>>(`/users/${userId}`);
    return data;
  };
  
export const getMySubmissions = async (params: CheckMySubmissionsRequest) => {
    const { data } = await http.get<ApiResultResponse<CheckMySubmissionsResult>>(
        "/users/me/submissions",
        { params },
    );
    return data;
};

export const getUserSubmissions = async (
    userId: number,
    params: CheckUserSubmissionsRequest,
    ) => {
    const { data } = await http.get<ApiResultResponse<CheckUserSubmissionsResult>>(
        `/users/${userId}/submissions`,
        { params },
    );
    return data;
};


export const getCircleProfile = async (circleId: number) => {
    const { data } = await http.get<ApiResultResponse<CheckCircleProfileResult>>(`/circles/${circleId}`);
    return data;
};

export const getCircleSubmissions = async (circleId: number, params: CheckCircleSubmissionsRequest) => {
    circleId;
    const { data } = await http.get<ApiResultResponse<CheckCircleSubmissionsResult>>(
        `/circles/${circleId}/submissions`,
        { params },
    );
    return data;
};


export const postFollowRequest = async (targetId: number) => {
    const { data } = await http.post<ApiResultResponse<FollowRequestResult>>(`/users/${targetId}/follows`);
    return data;
};