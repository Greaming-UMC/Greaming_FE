export const ENDPOINTS = {

    // 도메인: AUTH (명세서: AUTH_SIGNUP)
    AUTH : {
        // 최초 정보 기입 (POST /api/user/registinfo)
        REGISTER_INFO: "/api/user/registinfo",

        // 로그아웃 (POST /api/auth/logout)
        LOGOUT: "/api/auth/logout",

        // 토큰 재발급 (POST /api/auth/reissue)
        REISSUE_TOKEN: "/api/auth/reissue",

        // 소셜 로그인 (소셜 로그인	GET	/api/auth/login/social/{provider})
        SOCIAL_LOGIN: (provider: string) => `/api/auth/login/social/${provider}`,
    },



    // 도메인: ACCOUNT
    ACCOUNT: {
        // 계정 상태 변경 (PUT  /api/users/me/status)
        UPDATE_STATUS: "/api/users/me/status",

        // 계정 삭제 (DELETE    /api/users/me)
        DELETE_ACCOUNT: "/api/users/me",

        // 계정 설정 화면 조회  (GET    /api/users/me/account)
        GET_ACCOUNT_SETTINGS: "/api/users/me/account",
    },



    // 도메인: PROFILE_SETTINGS
    PROFILE_SETTINGS: {
        // 닉네임 중복 확인 (GET   /api/users/checkNickname)
        CHECK_NICKNAME: "/api/users/checkNickname",

        // 프로필 설정 화면 조회(GET /api/users/me/profile)
        GET_PROFILE_SETTINGS: "/api/users/me/profile",
    },



    // 도메인: USER
    USER : {
        // 유저 프로필 화면 상단 조회  (GET    /api/users/{userId})
        GET_USER_PROFILE_HEADER: (userId: number | string) => `/api/users/${userId}`,

        // 내 프로필 화면 상단  (GET    /api/users/me)
        GET_MY_PROFILE_HEADER: "/api/users/me",

        //내 작품들 조회(페이지) (GET    /api/users/me/works)
        GET_MY_WORKS: "/api/users/me/works",
        
        //유저 작품들 조회(페이지)    (GET    /api/users/{userId}/works)
        GET_USER_WORKS: (userId: number | string) => `/api/users/${userId}/works`,
    },



    // 도메인: SUBMISSIONS
    SUBMISSIONS : {
        // 작품 게시물 수정 (PUT    /api/works/{workId})
        UPDATE_WORK: (workId: number | string) => `/api/works/${workId}`,

        // 작품 게시물 삭제 (DELETE     /api/works/{workId})
        DELETE_WORK: (workId: number | string) => `/api/works/${workId}`,

        // 유저 작품 상세 조회 (GET     /api/works/{workId})
        GET_WORK_DETAIL: (workId: number | string) => `/api/works/${workId}`,

        // 작품 미리보기  (GET    /api/works/{workId}/preview)
        GET_WORK_PREVIEW: (workId: number | string) => `/api/works/${workId}/preview`,

        // 작품들 조회(페이지)  (GET    /api/works)
        GET_WORKS: "/api/works",

        // 챌린지 출품작 조회(페이지)  (GET    /api/challenges/{challengeId}/works)
        GET_CHALLENGE_WORKS: (challengeId: number | string) => `/api/challenges/${challengeId}/works`,

        // 메인화면 상단  (GET    /api/home)
        GET_HOME_TOP: "/api/home",

        // 게시물 업로드    (POST /api/users/upload)
        UPLOAD_WORK: "/api/users/upload",
    },



    // 도메인: FOLLOW
    FOLLOW : {
        // 팔로우 요청 거절     (DELETE    /api/users/{followerId}/follows/reject)
        REJECT_FOLLOW_REQUEST: (followerId: number | string) => `/api/users/${followerId}/follows/reject`,

        // 팔로우 요청 수락    (POST   /api/users/me/followRequests)
        ACCEPT_FOLLOW_REQUEST: "/api/users/me/followRequests",

        // 팔로워 목록 조회    (GET    /api/users/{userId}/followers)
        GET_FOLLOWERS: (userId: number | string) => `/api/users/${userId}/followers`,

        // 팔로잉 목록 조회    (GET    /api/users/{userId}/followings)
        GET_FOLLOWINGS: (userId: number | string) => `/api/users/${userId}/followings`,

        // 언팔로우  (DELETE    /api/users/{targetId}/follows)
        UNFOLLOW: (targetId: number | string) => `/api/users/${targetId}/follows`,

        // 팔로우   (POST  /api/users/{targetId}/follows)
        FOLLOW: (targetId: number | string) => `/api/users/${targetId}/follows`,
    },



    // 도메인: CALENDAR (✅ 오타 수정: CALENDER -> CALENDAR)
    CALENDAR : {
        // 내 캘린더 조회(페이지)   (GET  /api/users/me/calendar)
        GET_MY_CALENDAR: "/api/users/me/calendar",

        // 유저 캘린더 조회(페이지)   (GET    /api/users/{userId}/calendar)
        GET_USER_CALENDAR: (userId: number | string) => `/api/users/${userId}/calendar`,

        // 유저 작품들 조회(페이지) (GET  /api/users/{userId}/works)
        // 💡 명세서에 여기도 있다면 중복이어도 남겨두는 게 찾기 편합니다!
        GET_USER_WORKS: (userId: number | string) => `/api/users/${userId}/works`,
    },



    // 도메인: CIRCLE
    CIRCLE: {
        // 써클 제작 (POST  /api/circles)
        CREATE: "/api/circles",

        // 써클 검색 (GET /api/circles/search)
        SEARCH: "/api/circles/search",

        // 써클 설정 변경 (PUT /api/circles/{circleId})
        UPDATE: (circleId: number | string) => `/api/circles/${circleId}`,

        // 초대할 유저 검색 (GET /api/circles/{circleId}/users/search)
        SEARCH_USER: (circleId: number | string) => `/api/circles/${circleId}/users/search`,

        // 써클원 확인 (GET /api/circles/{circleId}/members)
        GET_MEMBERS: (circleId: number | string) => `/api/circles/${circleId}/members`,

        // 써클원 내보내기 (DELETE /api/circles/{circleId}/members/{memberId})
        KICK_MEMBER: (circleId: number | string, memberId: number | string) => 
        `/api/circles/${circleId}/members/${memberId}`,

        // 써클 초대 (POST /api/users/{targetId}/invites)
        INVITE_USER: (targetId: number | string) => `/api/users/${targetId}/invites`,

        // 써클 작품들 조회(페이지)   (GET    /api/circles/{circleId}/works)
        GET_CIRCLE_WORKS: (circleId: number | string) => `/api/circles/${circleId}/works`,

        // 써클 프로필 화면 조회     (GET    /api/circles/{circleId})
        GET_CIRCLE_PROFILE: (circleId: number | string) => `/api/circles/${circleId}`,
    },



    // 도메인: PRIVACY
    PRIVACY: {
        DELETE_HISTORY: "/api/privacy/history",
        DOWNLOAD_DATA: "/api/privacy/download",
    },

} as const;