import { useInfiniteQuery } from "@tanstack/react-query";
import type { CheckSubmissionType, SortBy, HomeCardType } from "../../../apis/types/common";
import { getSubmissions } from "../../../apis/types/submission/getSubmissions";
import { getChallengeDateSubmissions } from "../../../apis/types/submission/getChallengeDateSubmissions";
import type { HomeView } from "../components/type";
import { mapDtoToHomeCard } from "../utils/mapHomeCard";

interface Params {
  view: HomeView;
  type: CheckSubmissionType;
  sort: SortBy;
  tags: string[];
  dateTimeIso: string;
  size?: number;
}

export const useInfiniteHomeCards = ({ view, type, sort, tags, dateTimeIso, size = 50 }: Params) => {
  const normalizedTags = tags.map((tag) => tag.trim()).filter(Boolean);

  return useInfiniteQuery({
    queryKey: [
      "homeGrid",
      view,
      view === "HOME" ? type : "ALL",
      sort,
      normalizedTags.join(","),
      dateTimeIso,
      size,
    ],
    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      if (view === "HOME") {
        const res = await getSubmissions({
          type,
          sortBy: sort,
          tags: normalizedTags.length > 0 ? normalizedTags : undefined,
          page: pageParam,
          size,
        });

        return {
          items: res.submissions.map(mapDtoToHomeCard) as HomeCardType[],
          pageInfo: res.pageInfo,
        };
      }

      const effectiveSort = sort === "bookmarks" ? "popular" : sort;

      const res = await getChallengeDateSubmissions({
        challengeType: view, // "DAILY" | "WEEKLY"
        dateTime: dateTimeIso,
        sortBy: effectiveSort,
        tags: normalizedTags.length > 0 ? normalizedTags : undefined,
        page: pageParam,
        size,
      });

      return {
        items: res.submissions.map(mapDtoToHomeCard) as HomeCardType[],
        pageInfo: res.pageInfo,
      };
    },

    getNextPageParam: (lastPage) => {
      const next = lastPage.pageInfo.currentPage + 1;
      return lastPage.pageInfo.isLast ? undefined : next;
    },

    staleTime: 1000 * 30,
  });
};
