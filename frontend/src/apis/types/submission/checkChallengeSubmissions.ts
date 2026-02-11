import type { SubmissionListItemDto, PageInfo } from "../common";

export type ChallengeType = "DAILY" | "WEEKLY";
export type ChallengeSortBy = "latest" | "popular" | "recommend";

export interface CheckChallengeDateSubmissionsRequest {
  challengeType: ChallengeType;
  dateTime: string;
  sortBy?: ChallengeSortBy;
  page?: number;
  size?: number;
}

export interface CheckChallengeDateSubmissionsResult {
  submissions: SubmissionListItemDto[];
  pageInfo: PageInfo;
}
