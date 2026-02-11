/**
 * 메인 화면 상단 조회 (GET /api/home)
 * URI: /api/home
 */

export type ChallengeCycle = "DAILY" | "WEEKLY";
export type ChallengeStatus = "PROCEEDING" | "DONE" | "UPCOMING";

// result.dailyChallengeInfo / result.weeklyChallengeInfo
export interface HomeChallengeInfo {
  challengeId: number;
  title: string;
  description: string;
  referenceContent: string;
  cycle: ChallengeCycle;
  periodKey: string;
  startAt: string; // "2024-02-10"
  endAt: string;   // "2024-02-17"
  participant: number;
  status: ChallengeStatus;
  isArchived: boolean;
}

// result.userHomeInfo
export interface UserHomeInfo {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  level: string;
  circleId: number | null;
  circleName: string | null;
  circleProfileUrl: string | null;
}

// result 전체
export interface CheckHomeHeaderResult {
  dailyChallengeInfo: HomeChallengeInfo;
  weeklyChallengeInfo: HomeChallengeInfo;
  userHomeInfo: UserHomeInfo;
}
