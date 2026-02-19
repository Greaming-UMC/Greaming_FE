export const ENDPOINTS = {
  AUTH: {
    REGISTER_INFO: "/api/users/registinfo",
    SOCIAL_LOGIN: (provider: string) => `/oauth2/authorization/${provider}`,
    LOGOUT: "/api/auth/logout",
    REISSUE_TOKEN: "/api/auth/reissue",
  },

  ACCOUNT: {
    UPDATE_STATUS: "/api/users/me/status",
    DELETE_ACCOUNT: "/api/users/me",
    GET_ACCOUNT_SETTINGS: "/api/users/me/account",
  },

  PROFILE_SETTINGS: {
    CHECK_NICKNAME: "/api/users/checkNickname",
    GET_PROFILE_SETTINGS: "/api/users/me/profile",
    UPDATE_PROFILE_INFO: "/api/users/info",
  },

  USER: {
    GET_USER_PROFILE_HEADER: (userId: number | string) => `/api/users/${userId}/info`,
    GET_MY_PROFILE_HEADER: "/api/users/me",
    UPDATE_INFO: "/api/users/info",
    CHECK_IS_ME: (userId: number | string) => `/api/users/${userId}/is-me`,
  },

  USER_SUBMISSIONS: {
    GET_USER_SUBMISSIONS: (userId: number | string) => `/api/submissions/user/${userId}`,
  },

  USER_WORKS: {
    GET_MY_WORKS: "/api/users/me/works",
    GET_USER_WORKS: (userId: number | string) => `/api/users/${userId}/works`,
  },

  HOME: {
    GET_HOME: "/api/home",
  },

  SUBMISSION: {
    GET_SUBMISSIONS: "/api/submissions",
    GET_USER_SUBMISSIONS: (userId: number | string) => `/api/submissions/user/${userId}`,
    GET_SUBMISSION_DETAIL: (submissionId: number | string) => `/api/submissions/${submissionId}`,
    GET_SUBMISSION_PREVIEW: (submissionId: number | string) =>
      `/api/submissions/${submissionId}/preview`,
    GET_SUBMISSION_COMMENTS: (submissionId: number | string) =>
      `/api/submissions/${submissionId}/comments`,
    TOGGLE_LIKE: (submissionId: number | string) => `/api/submissions/${submissionId}/like`,

    UPDATE_SUBMISSION: (submissionId: number | string) => `/api/submissions/${submissionId}`,
    DELETE_SUBMISSION: (submissionId: number | string) => `/api/submissions/${submissionId}`,
    GET_CHALLENGE_SUBMISSIONS: (challengeId: number | string) =>
      `/api/challenges/${challengeId}/submissions`,
    UPLOAD_SUBMISSION: "/api/submissions",

    // 레거시 호환: 기존 코드에서 참조 가능
    GET_HOME_TOP: "/api/home",
  },

  CHALLENGE: {
    GET_DATE_SUBMISSIONS: "/api/challenges/date/submissions",
    GET_CURRENT_SUBMISSIONS: "/api/challenges/current/submissions",
  },

  CIRCLE: {
    CREATE: "/api/circles",
    SEARCH: "/api/circles/search",
    UPDATE: (circleId: number | string) => `/api/circles/${circleId}`,
    SEARCH_USER: (circleId: number | string) => `/api/circles/${circleId}/users/search`,
    GET_MEMBERS: (circleId: number | string) => `/api/circles/${circleId}/members`,
    KICK_MEMBER: (circleId: number | string, memberId: number | string) =>
      `/api/circles/${circleId}/members/${memberId}`,
    INVITE_USER: (targetId: number | string) => `/api/users/${targetId}/invites`,
    GET_CIRCLE_SUBMISSIONS: (circleId: number | string) => `/api/circles/${circleId}/submissions`,
    GET_CIRCLE_WORKS: (circleId: number | string) => `/api/circles/${circleId}/works`,
    GET_CIRCLE_PROFILE: (circleId: number | string) => `/api/circles/${circleId}`,
  },

  FOLLOW: {
    TOGGLE: (targetId: number | string) => `/api/users/${targetId}/follow`,
    REJECT_FOLLOW_REQUEST: (followerId: number | string) => `/api/users/${followerId}/follows/reject`,
    ACCEPT_FOLLOW_REQUEST: "/api/users/me/followRequests",
    GET_FOLLOWERS: (userId: number | string) => `/api/users/${userId}/followers`,
    GET_FOLLOWINGS: (userId: number | string) => `/api/users/${userId}/followings`,
    UNFOLLOW: (targetId: number | string) => `/api/users/${targetId}/follows`,
    FOLLOW: (targetId: number | string) => `/api/users/${targetId}/follows`,
  },

  CALENDAR: {
    GET_MY_CALENDAR: "/api/users/me/calendar",
    GET_USER_CALENDAR: (userId: number | string) => `/api/users/${userId}/calendar`,
  },

  COMMENT: {
    CREATE_COMMENT: "/api/comments",
    GET_COMMENT_REPLIES: (commentId: number | string) => `/api/comments/${commentId}/replies`,
    CREATE_REPLY: (commentId: number | string) => `/api/comments/${commentId}/replies`,
  },

  PRIVACY: {
    DELETE_HISTORY: "/api/privacy/history",
    DOWNLOAD_DATA: "/api/privacy/download",
  },
} as const;
