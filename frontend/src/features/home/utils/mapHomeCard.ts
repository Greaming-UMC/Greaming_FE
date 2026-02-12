import type { HomeCardType, SubmissionListItemDto } from "../../../apis/types/common";

export const mapDtoToHomeCard = (dto: SubmissionListItemDto): HomeCardType => {
  return {
    submissionId: dto.submissionId,
    thumbnailUrl: dto.thumbnailUrl,
    counters: {
      likesCount: dto.likesCount,
      commentCount: dto.commentCount,
      bookmarkCount: dto.bookmarkCount,
    },
    isLiked: false,
    title: "",
    nickname: dto.nickname,
    profileImgUrl: dto.profileImageUrl ?? "",
  };
};
