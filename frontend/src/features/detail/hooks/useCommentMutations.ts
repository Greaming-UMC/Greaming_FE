import { useMutation } from '@tanstack/react-query';
import { createComment, createReply } from '../api/api';

interface CreateCommentParams {
  submissionId: number;
  content: string;
}

interface CreateReplyParams {
  commentId: number;
  content: string;
}

export const useCommentMutations = () => {
  // 댓글 작성 mutation
  const commentMutation = useMutation({
    mutationFn: async ({ submissionId, content }: CreateCommentParams) => {
      const response = await createComment({ submissionId, content });
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '댓글 작성 실패');
      }
      return response.result;
    },
  });

  // 답글 작성 mutation
  const replyMutation = useMutation({
    mutationFn: async ({ commentId, content }: CreateReplyParams) => {
      const response = await createReply(commentId, { content });
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '답글 작성 실패');
      }
      return response.result;
    },
  });

  return {
    // 댓글 관련
    createComment: commentMutation.mutate,
    createCommentAsync: commentMutation.mutateAsync,
    isCreatingComment: commentMutation.isPending,
    commentError: commentMutation.error,
    
    // 답글 관련
    createReply: replyMutation.mutate,
    createReplyAsync: replyMutation.mutateAsync,
    isCreatingReply: replyMutation.isPending,
    replyError: replyMutation.error,
  };
};
