import type { SubmissionListItemDto, PageInfo } from "../common";

/*
 * 특정 날짜 챌린지 게시물 조회 - 홈 화면 캐러셀 (GET /api/challenges/date/submissions)
 * URI: /api/challenges/date/submissions
 */
export type ChallengeType = "DAILY" | "WEEKLY";
export type ChallengeSortBy = "latest" | "popular" | "recommend";

export interface ChallengeSubmissionsResult {
  submissions: SubmissionListItemDto[];
  pageInfo: PageInfo;
}

export interface CheckChallengeDateSubmissionsRequest {
  challengeType: ChallengeType;
  dateTime: string;
  sortBy?: ChallengeSortBy;
  tags?: string[];
  page?: number;
  size?: number;
}

export interface CheckChallengeCurrentSubmissionsRequest {
  challengeType: ChallengeType;
  sortBy?: ChallengeSortBy;
  page?: number;
  size?: number;
}
