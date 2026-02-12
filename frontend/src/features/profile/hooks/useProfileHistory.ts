import { useMemo } from "react";

import { useMyProfile } from "./useMyProfile";
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

  const result = isSelf ? myProfileQuery.data?.result : userProfileQuery.data?.result;
  const myUserId =
    myProfileQuery.data?.result?.user_information?.userId ??
    myProfileQuery.data?.result?.userInformation?.userId;

  const targetUserId = isSelf ? myUserId : params.userId;
  const shouldFetchSubmissions = typeof targetUserId === "number";

  const submissionsQuery = useUserSubmissions(
    shouldFetchSubmissions ? targetUserId : undefined,
    { page: 1, size: 1 },
  );

  const challengeCalendar = result?.challenge_calender ?? result?.challengeCalendar;
  const challengeDates = [
    ...(challengeCalendar?.dailyChallenge ?? []),
    ...(challengeCalendar?.weeklyChallenge ?? []),
  ];

  const maxConsecutiveChallengeDays = useMemo(
    () => getMaxConsecutiveDays(challengeDates),
    [challengeDates],
  );

  const uploadCount =
    submissionsQuery.data?.result?.pageInfo?.totalElements ??
    submissionsQuery.data?.result?.submissions?.length ??
    submissionsQuery.data?.result?.submission_list?.length ??
    0;

  const isLoading =
    (isSelf ? myProfileQuery.isLoading : userProfileQuery.isLoading) ||
    submissionsQuery.isLoading;

  return {
    uploadCount,
    maxConsecutiveChallengeDays,
    isLoading,
  };
};
