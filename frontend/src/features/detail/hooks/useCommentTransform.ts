import { useMemo } from 'react';
import type { CommentDetail } from '../../../apis/types/submission/checkSubmissionDetails';
import { transformCommentDetail, type Comment } from '../types/comment';

/**
 * API의 CommentDetail 배열을 UI용 Comment 배열로 변환하는 훅
 * 
 * @param commentList - API에서 받은 댓글 목록
 * @returns 변환된 댓글 목록
 */
export const useCommentTransform = (
  commentList?: (CommentDetail & {
    commentId?: number;
    replyCount?: number;
    createdAt?: string;
    isLike?: boolean;
    likeCount?: number;
  })[]
): Comment[] => {
  return useMemo(() => {
    if (!commentList || !commentList.length) return [];
    return commentList.map((c, i) => transformCommentDetail(c, i));
  }, [commentList]);
};
