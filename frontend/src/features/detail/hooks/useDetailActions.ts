import { useState, useCallback } from "react";
import type { CommentDetail } from "../../../apis/types/submission/checkSubmissionDetails";
import type { PageInfo } from "../../../apis/types/common";
import type { CreateCommentResult } from "../../../apis/types/submission/createComment";
import {
  toggleSubmissionLike,
  getSubmissionComments,
} from "../api/api";

interface UseDetailActionsParams {
  submissionId: number | null;
}

export const useDetailActions = ({ submissionId }: UseDetailActionsParams) => {
  const [counts, setCounts] = useState({
    likes: 0,
    comments: 0,
    scraps: 0,
    liked: false,
  });
  const [comments, setComments] = useState<CommentDetail[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);

  const initFromApi = useCallback(
    (submission: {
      likesCount: number;
      commentCount: number;
      bookmarkCount: number;
      liked: boolean;
    }, initialComments: CommentDetail[], initialPageInfo: PageInfo) => {
      setCounts({
        likes: submission.likesCount,
        comments: submission.commentCount,
        scraps: submission.bookmarkCount,
        liked: submission.liked,
      });
      setComments(initialComments);
      setPageInfo(initialPageInfo);
    },
    [],
  );

  const handleCommentCreated = useCallback((newApiComment: CreateCommentResult) => {
    setComments((prev) => [...prev, { ...newApiComment, isLiked: false } as CommentDetail]);
    setCounts((prev) => ({ ...prev, comments: prev.comments + 1 }));
  }, []);

  const handleToggleLike = useCallback(async () => {
    if (submissionId === null) return;
    try {
      const response = await toggleSubmissionLike(submissionId);
      if (response.isSuccess && response.result) {
        setCounts((prev) => ({
          ...prev,
          likes: response.result!.likeCount,
          liked: response.result!.isLiked,
        }));
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  }, [submissionId]);

  const handleLoadMoreComments = useCallback(async () => {
    if (!pageInfo || pageInfo.isLast || !submissionId) return;
    try {
      const response = await getSubmissionComments(submissionId, {
        page: pageInfo.currentPage + 1,
      });
      if (response.isSuccess && response.result) {
        setComments((prev) => [...prev, ...response.result!.comments]);
        setPageInfo(response.result.pageInfo);
      }
    } catch (error) {
      console.error("댓글 더보기 실패:", error);
    }
  }, [pageInfo, submissionId]);

  return {
    counts,
    comments,
    pageInfo,
    initFromApi,
    handleCommentCreated,
    handleToggleLike,
    handleLoadMoreComments,
  };
};
