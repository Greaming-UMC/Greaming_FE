import type { HomeCardType } from "../../../apis/types/common";
import MockFeedJpg from "../../../assets/background/mock_feed.jpg";

export const MOCK_HOME_CARDS: HomeCardType[] = Array.from({ length: 60 }).map(
  (_, i) => ({
    submissionId: i + 1,
    title: `작품 제목 ${i + 1}`,
    nickname: `user_${i + 1}`,
    profileImgUrl: "",
    // API 연동 전 확인용 jpg
    thumbnailUrl: MockFeedJpg,
    counters: {
      likesCount: Math.floor(Math.random() * 100),
      commentCount: Math.floor(Math.random() * 20),
      bookmarkCount: Math.floor(Math.random() * 10),
    },
    isLiked: false,
  }),
);
