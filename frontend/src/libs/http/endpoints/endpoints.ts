export const ENDPOINTS = {

    // 도메인: AUTH
    AUTH : {
        REGISTER_INFO: "/api/user/registinfo",
        SOCIAL_LOGIN: (provider: string) => `/oauth2/authorization/${provider}`,
        LOGOUT: "/api/auth/logout",
        REISSUE_TOKEN: "/api/auth/reissue",
    },

    // 도메인: ACCOUNT
    ACCOUNT: {
        UPDATE_STATUS: "/api/users/me/status",
        DELETE_ACCOUNT: "/api/users/me",
        GET_ACCOUNT_SETTINGS: "/api/users/me/account",
    },

    // 도메인: PROFILE_SETTINGS
    PROFILE_SETTINGS: {
        CHECK_NICKNAME: "/api/users/checkNickname",
        GET_PROFILE_SETTINGS: "/api/users/me/profile",
        UPDATE_PROFILE_INFO: "/api/users/info",
    },

    // 도메인: USER
    USER : {
        GET_USER_PROFILE_HEADER: (userId: number | string) => `/api/user/${userId}/info`,
        GET_MY_PROFILE_HEADER: "/api/users/me",
    },

    // 도메인: USER_WORKS (작품 관련은 여기서 통합 관리)
    USER_WORKS : {
        GET_MY_WORKS: "/api/users/me/works",
        GET_USER_WORKS: (userId: number | string) => `/api/users/${userId}/works`,
    },

    // 도메인: WORK
    WORK : {
        UPDATE_WORK: (workId: number | string) => `/api/works/${workId}`,
        DELETE_WORK: (workId: number | string) => `/api/works/${workId}`,
        GET_WORK_DETAIL: (workId: number | string) => `/api/works/${workId}`,
        GET_WORK_PREVIEW: (workId: number | string) => `/api/works/${workId}/preview`,
        GET_WORKS: "/api/works",
        GET_CHALLENGE_WORKS: (challengeId: number | string) => `/api/challenges/${challengeId}/works`,
        UPLOAD_WORK: "/api/users/upload",
        
        // 💡 (선택) 홈 화면은 성격이 좀 달라서 따로 빼도 좋음 (일단 여기 둠)
        GET_HOME_TOP: "/api/home",
    },

    // 도메인: FOLLOW
    FOLLOW : {
        REJECT_FOLLOW_REQUEST: (followerId: number | string) => `/api/users/${followerId}/follows/reject`,
        ACCEPT_FOLLOW_REQUEST: "/api/users/me/followRequests",
        GET_FOLLOWERS: (userId: number | string) => `/api/users/${userId}/followers`,
        GET_FOLLOWINGS: (userId: number | string) => `/api/users/${userId}/followings`,
        UNFOLLOW: (targetId: number | string) => `/api/users/${targetId}/follows`,
        FOLLOW: (targetId: number | string) => `/api/users/${targetId}/follows`,
    },

    // 도메인: CALENDAR
    CALENDAR : {
        GET_MY_CALENDAR: "/api/users/me/calendar",
        GET_USER_CALENDAR: (userId: number | string) => `/api/users/${userId}/calendar`,
    },

    // 도메인: CIRCLE
    CIRCLE: {
        CREATE: "/api/circles",
        SEARCH: "/api/circles/search",
        UPDATE: (circleId: number | string) => `/api/circles/${circleId}`,
        SEARCH_USER: (circleId: number | string) => `/api/circles/${circleId}/users/search`,
        GET_MEMBERS: (circleId: number | string) => `/api/circles/${circleId}/members`,
        KICK_MEMBER: (circleId: number | string, memberId: number | string) => 
            `/api/circles/${circleId}/members/${memberId}`,
        INVITE_USER: (targetId: number | string) => `/api/users/${targetId}/invites`,
        GET_CIRCLE_WORKS: (circleId: number | string) => `/api/circles/${circleId}/works`,
        GET_CIRCLE_PROFILE: (circleId: number | string) => `/api/circles/${circleId}`,
    },

    // 도메인: PRIVACY
    PRIVACY: {
        DELETE_HISTORY: "/api/privacy/history",
        DOWNLOAD_DATA: "/api/privacy/download",
    },

} as const;
