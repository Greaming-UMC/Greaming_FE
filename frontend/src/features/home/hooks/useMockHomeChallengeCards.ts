import { useMemo, useState } from "react";
import type { HomeCardType } from "../../../apis/types/common";
import {
  DAILY_CHALLENGE_CARDS,
  WEEKLY_CHALLENGE_CARDS,
} from "../api/MockHomeChallengeCards";

type ChallengeType = "DAILY" | "WEEKLY";

const VISIBLE_SIZE = 5;
const MOVE_SIZE = 4;

export const useMockHomeChallengeCards = (type: ChallengeType) => {
  const source: HomeCardType[] =
    type === "DAILY"
      ? DAILY_CHALLENGE_CARDS
      : WEEKLY_CHALLENGE_CARDS;

  const [startIndex, setStartIndex] = useState(0);

  // 마지막으로 시작 가능한 인덱스
  const maxIndex = Math.max(0, source.length - VISIBLE_SIZE);

  // 현재 화면에 보일 카드 5개
  const cards = useMemo(
    () => source.slice(startIndex, startIndex + VISIBLE_SIZE),
    [source, startIndex],
  );

  const moveNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + MOVE_SIZE, maxIndex),
    );
  };

  const movePrev = () => {
    setStartIndex((prev) =>
      Math.max(prev - MOVE_SIZE, 0),
    );
  };

  return {
    cards,
    moveNext,
    movePrev,
    startIndex,
    hasPrev: startIndex > 0,
    hasNext: startIndex < maxIndex,
  };
};
