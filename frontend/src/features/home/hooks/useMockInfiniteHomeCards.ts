import { useState } from "react";
import type { HomeCardType } from "../../../apis/types/common";
import { MOCK_HOME_CARDS } from "../../home/api/mockHomeCards";

const PAGE_SIZE = 12;

export const useMockInfiniteHomeCards = () => {
  const [page, setPage] = useState(1);

  const cards: HomeCardType[] = MOCK_HOME_CARDS.slice(
    0,
    page * PAGE_SIZE
  );

  const hasNextPage = cards.length < MOCK_HOME_CARDS.length;

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    cards,
    hasNextPage,
    loadMore,
    isLoading: false,
  };
};
