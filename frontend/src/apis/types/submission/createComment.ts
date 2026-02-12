/**
 * POST /api/comments
 * 댓글 생성
 */

// Request
export interface CreateCommentRequest {
  submissionId: number;
  content: string;
}

// Response
export interface CreateCommentResult {
  commentId: number;
  writer_nickname: string;
  writer_profileImgUrl: string;
  content: string;
  createdAt: string;
  isLike: boolean;
  likeCount: number;
}