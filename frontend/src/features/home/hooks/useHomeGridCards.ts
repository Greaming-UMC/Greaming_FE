import { useInfiniteQuery } from "@tanstack/react-query";
import type { CheckSubmissionType, SortBy, HomeCardType } from "../../../apis/types/common";
import { getSubmissions } from "../../../apis/types/submission/getSubmissions";
import { getChallengeDateSubmissions } from "../../../apis/types/submission/getChallengeDateSubmissions";
import type { ChallengeType } from "../components/type";
import { mapDtoToHomeCard } from "../utils/mapHomeCard";
import { getSubmissionPreview } from "../../../apis/types/submission/getSubmissionPreview";

type HomeView = "HOME" | "DAILY" | "WEEKLY";

interface Params {
  view: HomeView;
  type: CheckSubmissionType;
  sortBy: SortBy;
  tags: string[];
  dateTimeIso?: string;
  size?: number;
}

type Page = {
  items: HomeCardType[];
  pageInfo: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    isLast: boolean;
    isFirst: boolean;
  };
};

const todayIso = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}T00:00:00`;
};

const filterByTags = async (cards: HomeCardType[], tags: string[]) => {
  if (tags.length === 0) return cards;

  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const previews = await Promise.all(
    cards.map((c) =>
      getSubmissionPreview(c.submissionId)
        .then((p) => ({ id: c.submissionId, tags: p.tags ?? [] }))
        .catch(() => ({ id: c.submissionId, tags: [] })),
    ),
  );

  const okIds = new Set(
    previews
      .filter((p) => p.tags.some((t) => tagSet.has(String(t).toLowerCase())))
      .map((p) => p.id),
  );

  return cards.filter((c) => okIds.has(c.submissionId));
};

export const useHomeGridCards = ({ view, type, sortBy, tags, dateTimeIso, size = 50 }: Params) => {
  return useInfiniteQuery<Page>({
    queryKey: ["homeGrid", view, type, sortBy, tags.join(","), dateTimeIso ?? "", size],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const page = Number(pageParam ?? 1);

      if (view === "HOME") {
        const res = await getSubmissions({ type, sortBy, page, size });
        const base = res.submissions.map(mapDtoToHomeCard);
        const items = await filterByTags(base, tags);

        return {
          items,
          pageInfo: res.pageInfo,
        };
      }

      const challengeType: ChallengeType = view === "DAILY" ? "DAILY" : "WEEKLY";
      const dateTime = dateTimeIso ?? todayIso();

      const effectiveSortBy: SortBy = sortBy === "bookmarks" ? "popular" : sortBy;

      const res = await getChallengeDateSubmissions({
        challengeType,
        dateTime,
        sortBy: effectiveSortBy,
        page,
        size,
      });

      const base = res.submissions.map(mapDtoToHomeCard);
      const items = await filterByTags(base, tags);

      return {
        items,
        pageInfo: res.pageInfo,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.isLast) return undefined;
      return lastPage.pageInfo.currentPage + 1;
    },
    staleTime: 1000 * 30,
  });
};
