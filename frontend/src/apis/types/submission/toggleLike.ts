/**
 * POST /api/submissions/{submissionId}/like
 * 게시물 좋아요 토글
 */

// Request body is empty

// Response
export interface ToggleLikeResult {
  isLiked: boolean;
  likeCount: number;
}