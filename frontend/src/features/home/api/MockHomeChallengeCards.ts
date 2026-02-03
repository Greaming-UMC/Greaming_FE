import type { HomeCardType } from "../../../apis/types/common";

export const DAILY_CHALLENGE_CARDS: HomeCardType[] = Array.from(
  { length: 12 },
  (_, i) => ({
    submissionId: i + 1,
    thumbnailUrl: "https://via.placeholder.com/250",
    title: `Daily ${i + 1}`,
    nickname: `닉네임 ${i + 1}`,
    profileImgUrl: "",
    counters: {
      likesCount: 10,
      commentCount: 10,
      bookmarkCount: 10,
    },
    isLiked: false,
  }),
);

export const WEEKLY_CHALLENGE_CARDS: HomeCardType[] = Array.from(
  { length: 12 },
  (_, i) => ({
    submissionId: i + 101,
    thumbnailUrl: "https://via.placeholder.com/250",
    title: `Weekly ${i + 1}`,
    nickname: `닉네임 ${i + 1}`,
    profileImgUrl: "",
    counters: {
      likesCount: 24,
      commentCount: 8,
      bookmarkCount: 12,
    },
    isLiked: false,
  }),
);
