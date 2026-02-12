import { useMemo } from "react";

import { useMyProfile } from "./useMyProfile";
import { useMySubmissions } from "./useMySubmissions";
import { useUserProfile } from "./useUserProfile";
import { useUserSubmissions } from "./useUserSubmissions";

type UseProfileHistoryParams =
  | { mode: "self" }
  | { mode: "other"; userId?: number };

type ProfileHistory = {
  uploadCount: number;
  maxConsecutiveChallengeDays: number;
  isLoading: boolean;
};

const toMidnightTime = (value: string): number | null => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
};

const getMaxConsecutiveDays = (dates: string[]): number => {
  if (dates.length === 0) return 0;

  const normalized = Array.from(
    new Set(
      dates
        .map(toMidnightTime)
        .filter((value): value is number => value !== null),
    ),
  ).sort((a, b) => a - b);

  if (normalized.length === 0) return 0;

  const ONE_DAY = 24 * 60 * 60 * 1000;
  let current = 1;
  let max = 1;

  for (let index = 1; index < normalized.length; index += 1) {
    if (normalized[index] - normalized[index - 1] === ONE_DAY) {
      current += 1;
      if (current > max) max = current;
      continue;
    }
    current = 1;
  }

  return max;
};

export const useProfileHistory = (params: UseProfileHistoryParams): ProfileHistory => {
  const isSelf = params.mode === "self";

  const myProfileQuery = useMyProfile({ enabled: isSelf });
  const userProfileQuery = useUserProfile(!isSelf ? params.userId : undefined);
  const mySubmissionsQuery = useMySubmissions(
    {},
    { enabled: isSelf },
  );
  const userSubmissionsQuery = useUserSubmissions(
    !isSelf ? params.userId : undefined,
    {},
  );

  const profileResult = isSelf
    ? myProfileQuery.data?.result
    : userProfileQuery.data?.result;
  const submissionsResult = isSelf
    ? mySubmissionsQuery.data?.result
    : userSubmissionsQuery.data?.result;

  const challengeCalendar =
    profileResult?.challenge_calender ?? profileResult?.challengeCalendar;
  const challengeDates = [
    ...(challengeCalendar?.dailyChallenge ?? []),
    ...(challengeCalendar?.weeklyChallenge ?? []),
  ];

  const maxConsecutiveChallengeDays = useMemo(
    () => getMaxConsecutiveDays(challengeDates),
    [challengeDates],
  );

  const uploadCount = submissionsResult?.submissions?.length ?? 0;

  const isLoading = isSelf
    ? myProfileQuery.isLoading || mySubmissionsQuery.isLoading
    : userProfileQuery.isLoading || userSubmissionsQuery.isLoading;

  return {
    uploadCount,
    maxConsecutiveChallengeDays,
    isLoading,
  };
};
