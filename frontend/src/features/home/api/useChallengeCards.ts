import { useQuery } from "@tanstack/react-query";
import type { HomeCardType } from "../../../apis/types/common";
import { getChallengeDateSubmissions } from "../../../apis/types/submission/getChallengeDateSubmissions";
import type { ChallengeType } from "../components/type";
import { mapDtoToHomeCard } from "../utils/mapHomeCard";

const todayIso = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}T00:00:00`;
};

export const useChallengeCards = (challengeType: ChallengeType) => {
  return useQuery<HomeCardType[]>({
    queryKey: ["challenge", "dateSubmissions", challengeType, todayIso(), "latest", 1, 50],
    queryFn: async () => {
      const res = await getChallengeDateSubmissions({
        challengeType,
        dateTime: todayIso(),
        sortBy: "latest",
        page: 1,
        size: 50,
      });
      return res.submissions.map(mapDtoToHomeCard);
    },
    staleTime: 1000 * 30,
  });
};
