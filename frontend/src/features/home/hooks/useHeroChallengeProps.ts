import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../../apis/types/home/getHome";

const parseTopic = (desc?: string) => {
  if (!desc) return undefined;
  const quoted = desc.match(/['“”"]([^'“”"]+)['“”"]/);
  if (quoted?.[1]) return quoted[1];

  const m = desc.match(/주제는\s*([^.,\n]+?)\s*(입니다|예요)/);
  return m?.[1]?.trim();
};

const toEndOfDay = (yyyyMmDd: string) => {
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, 23, 59, 59);
};

const makeTimeLeftText = (endAt?: string) => {
  if (!endAt) return undefined;
  const end = toEndOfDay(endAt);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  if (diff <= 0) return "마감";
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `남은시간 ${days}일`;
};

export const useHeroChallengeProps = () => {
  const homeQuery = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 5,
  });

  const dailyProps = useMemo(() => {
    const info = homeQuery.data?.dailyChallengeInfo;
    return {
      type: "DAILY" as const,
      title: info?.title ?? "Daily Challenge",
      participantText: info ? `참여자 ${info.participant}명` : undefined,
      timeLeftText: makeTimeLeftText(info?.endAt),
      topic: parseTopic(info?.description),
    };
  }, [homeQuery.data?.dailyChallengeInfo]);

  const weeklyProps = useMemo(() => {
    const info = homeQuery.data?.weeklyChallengeInfo;
    return {
      type: "WEEKLY" as const,
      title: info?.title ?? "Weekly Challenge",
      participantText: info ? `참여자 ${info.participant}명` : undefined,
      timeLeftText: makeTimeLeftText(info?.endAt),
      topic: parseTopic(info?.description),
    };
  }, [homeQuery.data?.weeklyChallengeInfo]);

  return { dailyProps, weeklyProps, homeQuery };
};
