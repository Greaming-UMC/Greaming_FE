import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse, UserInformations } from "../../../apis/types/common";

/**
 * 온보딩 정보 등록 (최초 가입 정보 저장)
 * @param params UserInformations 규격의 온보딩 데이터
 */
export const registerOnboardingInfo = async (params: UserInformations) => {
    // 서버 전송 시 불필요한 필드 제거
    const { 
        followerCount, 
        followingCount, 
        followState, 
        visibility, 
        ...payload 
    } = params;

    const { data } = await http.post<ApiResultResponse<null>>(
        ENDPOINTS.AUTH.REGISTER_INFO,
        payload
    );
    return data;
};