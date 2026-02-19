import type { CommentDetail } from '../../../apis/types/submission/checkSubmissionDetails';

/**
 * 기본 답글 타입
 */
export type Reply = {
  id: number;
  userId: number;
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
};

/**
 * API 응답의 CommentDetail을 UI Comment로 변환
 */
export const transformCommentDetail = (
  detail: CommentDetail & {
    commentId?: number;
    replyCount?: number;
    createdAt?: string;
    isLiked?: boolean;
    is_liked?: boolean;
  },
  index: number
): Comment => ({
  id: detail.comment_id ?? detail.commentId ?? index,
  userId: detail.user_id ?? 0,
  nickname: detail.writer_nickname,
  avatarSrc: detail.writer_profileImgUrl,
  content: detail.content,
  date: detail.createdAt ?? '',
  replyCount: detail.replyCount ?? 0,
  isLike: detail.isLiked ?? detail.is_liked ?? false,
});
