import type { CheckSettingsResult, DeleteAccountRequest, DeleteAccountResult, UpdateAccountRequest, UpdateAccountResult } from "../../../../apis/types/account";
import type { ApiResultResponse } from "../../../../apis/types/common";
import type { CheckNicknameResult, EditProfileSettingsParams, EditProfileSettingsResult, ProfileSettingsResult } from "../../../../apis/types/profileSettings";
import { http } from "../../../../libs/http/client";
import { ENDPOINTS } from "../../../../libs/http/endpoints/endpoints";

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

/**
 * 프로필 설정 정보 조회 (초기 로딩용)
 */
export const getProfileSettings = async () => {
    const { data } = await http.get<ApiResultResponse<ProfileSettingsResult>>(
        ENDPOINTS.PROFILE_SETTINGS.GET_PROFILE_SETTINGS
    );
    return data;
};

/**
 * 프로필 설정 수정 저장
 * @param params UserInformations 규격의 수정 데이터
 */
export const updateProfileSettings = async (params: EditProfileSettingsParams) => {
    const { data } = await http.put<ApiResultResponse<EditProfileSettingsResult>>(
        ENDPOINTS.PROFILE_SETTINGS.GET_PROFILE_SETTINGS,
        params
    );
    return data;
};

/**
 * 계정 설정 정보 조회 (GET)
 * @description 이메일, 공개 범위, 로그인 수단 조회
 */
export const getAccountSettings = async () => {
    const { data } = await http.get<ApiResultResponse<CheckSettingsResult>>(
        ENDPOINTS.ACCOUNT.GET_ACCOUNT_SETTINGS //
    );
    return data;
};

/**
 * 계정 상태 변경 (PUT)
 * @description 계정 일시정지(SUSPENDED) 처리 등
 */
export const updateAccountStatus = async (params: UpdateAccountRequest) => {
    const { data } = await http.put<ApiResultResponse<UpdateAccountResult>>(
        ENDPOINTS.ACCOUNT.UPDATE_STATUS, //
        params
    );
    return data;
};

/**
 * 계정 삭제 (DELETE)
 * @description 회원 탈퇴 처리
 */
export const deleteAccount = async (params: DeleteAccountRequest) => {
    const { data } = await http.delete<ApiResultResponse<DeleteAccountResult>>(
        ENDPOINTS.ACCOUNT.DELETE_ACCOUNT, //
        { data: params }
    );
    return data;
};