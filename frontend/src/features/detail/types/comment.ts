import type { CommentDetail } from '../../../apis/types/submission/checkSubmissionDetails';

/**
 * 기본 답글 타입
 */
export type Reply = {
  id: number;
  nickname: string;
  content: string;
  date?: string;
  avatarSrc?: string | null;
};

/**
 * UI에서 사용할 댓글 타입
 */
export type Comment = Reply & {
  replyCount?: number;
  isLike?: boolean;
  likeCount?: number;
};

/**
 * API 응답의 CommentDetail을 UI Comment로 변환
 */
export const transformCommentDetail = (
  detail: CommentDetail & {
    commentId?: number;
    replyCount?: number;
    createdAt?: string;
    isLike?: boolean;
    likeCount?: number;
  },
  index: number
): Comment => ({
  id: detail.commentId ?? index,
  nickname: detail.writer_nickname,
  avatarSrc: detail.writer_profileImgUrl,
  content: detail.content,
  date: detail.createdAt ?? '',
  replyCount: detail.replyCount ?? 0,
  isLike: detail.isLike ?? false,
  likeCount: detail.likeCount ?? 0,
});
