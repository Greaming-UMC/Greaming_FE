import type { HomeChallengeInfo } from "../../../apis/types/home/checkHomeHeader";

const toEndOfDay = (yyyyMmDd?: string) => {
  if (!yyyyMmDd) return null;
  const [year, month, day] = yyyyMmDd.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, 23, 59, 59);
};

export const makeChallengeRemainText = (endAt?: string) => {
  const endDate = toEndOfDay(endAt);
  if (!endDate) return undefined;

  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) return "마감";

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `남은시간 ${days}일`;
  if (hours > 0) return `남은시간 ${hours}시간 ${minutes}분`;
  return `남은시간 ${minutes}분`;
};

export const makeChallengeTopicText = (
  info: HomeChallengeInfo | null | undefined,
  fallback: string,
) => {
  if (!info) return fallback;

  const quoted = info.description.match(/['“”"]([^'“”"]+)['“”"]/);
  if (quoted?.[1]) return `'${quoted[1]}'`;

  if (info.description.trim()) return info.description;
  return info.title || fallback;
};
