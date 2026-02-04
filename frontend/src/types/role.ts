// 로그인/권한 레벨
export type AuthRole = "guest" | "user" | "admin";

// 유저 프로필 조회 기준 (/users/me vs /users/{userId})
export type ProfileViewerRole = "self" | "other";

// 써클 프로필 기준 (DTO: isleader, isJoining)
export type CircleViewerRole = "leader" | "member" | "guest";
