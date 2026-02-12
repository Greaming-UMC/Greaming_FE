import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { HomeCardType } from "../../../apis/types/common";
import { getChallengeDateSubmissions } from "../../../apis/types/submission/getChallengeDateSubmissions";
import { getChallengeCurrentSubmissions } from "../../../apis/types/submission/getChallengeCurrentSubmissions";
import type { ChallengeType } from "../components/type";
import { mapDtoToHomeCard } from "../utils/mapHomeCard";
import type { ChallengeSortBy } from "../../../apis/types/submission/checkChallengeSubmissions";

type Mode = "date" | "current";

const todayIso = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}T00:00:00`;
};

interface Options {
  mode?: Mode;
  dateTimeIso?: string;
  sortBy?: ChallengeSortBy;
  page?: number;
  size?: number;
}

export const useChallengeCards = (challengeType: ChallengeType, options: Options = {}) => {
  const { mode = "current", dateTimeIso, sortBy = "latest", page = 1, size = 50 } = options;

  const resolvedDateTimeIso = useMemo(() => {
    if (mode !== "date") return undefined;
    return dateTimeIso ?? todayIso();
  }, [mode, dateTimeIso]);

  return useQuery<HomeCardType[]>({
    queryKey: ["challenge", mode, "submissions", challengeType, resolvedDateTimeIso, sortBy, page, size],
    queryFn: async () => {
      if (mode === "date") {
        if (!resolvedDateTimeIso) return [];
        const res = await getChallengeDateSubmissions({
          challengeType,
          dateTime: resolvedDateTimeIso,
          sortBy,
          page,
          size,
        });
        return res.submissions.map(mapDtoToHomeCard);
      }

      const res = await getChallengeCurrentSubmissions({
        challengeType,
        sortBy,
        page,
        size,
      });
      return res.submissions.map(mapDtoToHomeCard);
    },
    enabled: mode === "current" ? true : Boolean(resolvedDateTimeIso),
    staleTime: 1000 * 30,
    retry: false,
  });
};
