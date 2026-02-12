import { useQuery } from "@tanstack/react-query";
import { mapDtoToHomeCard } from "../utils/mapHomeCard";
import type { HomeCardType } from "../../../apis/types/common";
import { getSubmissions } from "../../../apis/types/submission/getSubmissions";

export const useHomeCards = () => {
  return useQuery<HomeCardType[]>({
    queryKey: ["submissions", "home", "latest", 1, 50],
    queryFn: async () => {
      const res = await getSubmissions({ sortBy: "latest", page: 1, size: 50 });
      return res.submissions.map(mapDtoToHomeCard);
    },
    staleTime: 1000 * 30,
  });
};
