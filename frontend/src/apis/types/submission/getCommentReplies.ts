/**
 * GET /api/comments/{commentId}/replies
 * 특정 댓글의 답글 목록을 페이지네이션으로 조회
 */

// Request
export interface GetCommentRepliesRequest {
  page?: number;
  size?: number;
}

/**
 * 답글 상세 정보
 */
export interface ReplyDetail {
  replyId: number;
  userId: number;
  writer_nickname: string;
  writer_profileImgUrl: string;
  content: string;
  createdAt: string;
  isWriter: boolean;
  isLike: boolean;
  likeCount: number;
}

// Response
export interface GetCommentRepliesResult {
  replies: ReplyDetail[];
  totalCount: number;
}