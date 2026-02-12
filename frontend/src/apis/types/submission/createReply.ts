/**
 * POST /api/comments/{commentId}/replies
 * 답글 생성
 */

// Request
export interface CreateReplyRequest {
  content: string;
}

// Response
export interface CreateReplyResult {
  replyId: number;
  writer_nickname: string;
  writer_profileImgUrl: string;
  content: string;
  createdAt: string;
  isLike: boolean;
  likeCount: number;
}