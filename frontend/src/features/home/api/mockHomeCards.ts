import type { HomeCardType } from "../../../apis/types/common";

export const MOCK_HOME_CARDS: HomeCardType[] = Array.from({ length: 60 }).map(
  (_, i) => ({
    submissionId: i + 1,
    title: `작품 제목 ${i + 1}`,
    nickname: `user_${i + 1}`,
    profileImgUrl: '',
    thumbnailUrl: `https://picsum.photos/seed/home-${i}/400/300`,
    counters: {
      likesCount: Math.floor(Math.random() * 100),
      commentCount: Math.floor(Math.random() * 20),
      bookmarkCount: Math.floor(Math.random() * 10),
    },
    isLiked: false,
  })
);
