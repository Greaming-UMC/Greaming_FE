import { useState, useCallback, useRef, type KeyboardEvent } from 'react';
import { useCommentMutations } from './useCommentMutations';
import type { Comment } from '../types/comment';
import type { CreateCommentResult } from '../../../apis/types/submission/createComment';
import type { ReplyDetail } from '../../../apis/types/submission/getCommentReplies';

interface UseCommentInputProps {
  submissionId: number;
  onCommentCreated: (newComment: CreateCommentResult) => void;
  onReplyCreated: (commentId: number, newReply: ReplyDetail) => void;
}

/**
 * 댓글/답글 입력 상태 및 제출 로직을 관리하는 훅
 * 
 * @param props - 제출 시 필요한 ID와 콜백 함수들
 * @returns 입력 관리를 위한 상태와 메서드
 */
export const useCommentInput = ({
  submissionId,
  onCommentCreated,
  onReplyCreated,
}: UseCommentInputProps) => {
  const [text, setText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  
  // 🔒 중복 요청 방지를 위한 ref (isPending보다 더 즉각적)
  const isSubmittingRef = useRef(false);

  const {
    createCommentAsync,
    isCreatingComment,
    createReplyAsync,
    isCreatingReply,
  } = useCommentMutations();

  /**
   * 답글 달기 시작
   */
  const startReply = useCallback((comment: Comment) => {
    setReplyingTo(comment);
    setText(''); // 기존 입력 내용 초기화
  }, []);

  /**
   * 답글 달기 취소
   */
  const cancelReply = useCallback(() => {
    setReplyingTo(null);
    setText('');
  }, []);

  /**
   * 댓글/답글 제출
   */
  const handleSubmit = useCallback(async () => {
    if (!text.trim()) return;

    // 🔒 1차 방어: ref 체크 (즉각적)
    if (isSubmittingRef.current) {
      console.log('🚫 [REF] 이미 요청 중입니다. 중복 요청을 무시합니다.');
      return;
    }

    // 🔒 2차 방어: isPending 체크 (TanStack Query 상태)
    if (isCreatingComment || isCreatingReply) {
      console.log('🚫 [PENDING] 이미 요청 중입니다. 중복 요청을 무시합니다.');
      return;
    }

    // 제출 시작 - 락 설정
    isSubmittingRef.current = true;
    console.log('✅ 제출 시작');

    // 답글 모드
    if (replyingTo) {
      try {
        const newApiReply = await createReplyAsync({
          commentId: replyingTo.id,
          content: text,
        });

        // API 응답을 ReplyDetail 형식으로 변환
        const newReply: ReplyDetail = {
          replyId: newApiReply.replyId,
          userId: 0,
          writer_nickname: newApiReply.writer_nickname,
          writer_profileImgUrl: newApiReply.writer_profileImgUrl,
          content: newApiReply.content,
          createdAt: newApiReply.createdAt,
          isWriter: true,
          isLike: newApiReply.isLike,
          likeCount: newApiReply.likeCount,
        };

        onReplyCreated(replyingTo.id, newReply);
        setText('');
        cancelReply();
      } catch (error) {
        console.error('답글 작성 중 오류 발생:', error);
        alert('답글을 작성하는 동안 오류가 발생했습니다.');
      } finally {
        // 제출 완료 - 락 해제
        isSubmittingRef.current = false;
        console.log('✅ 답글 제출 완료');
      }
    } 
    // 댓글 모드
    else {
      try {
        const result = await createCommentAsync({
          submissionId,
          content: text,
        });
        onCommentCreated(result);
        setText('');
      } catch (error) {
        console.error('댓글 작성 중 오류 발생:', error);
        alert('댓글을 작성하는 동안 오류가 발생했습니다.');
      } finally {
        // 제출 완료 - 락 해제
        isSubmittingRef.current = false;
        console.log('✅ 댓글 제출 완료');
      }
    }
  }, [
    text,
    replyingTo,
    isCreatingComment,
    isCreatingReply,
    createCommentAsync,
    createReplyAsync,
    submissionId,
    onCommentCreated,
    onReplyCreated,
    cancelReply,
  ]);

  /**
   * Enter 키 핸들러
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return {
    text,
    setText,
    replyingTo,
    startReply,
    cancelReply,
    handleSubmit,
    handleKeyDown,
    isSubmitting: isCreatingComment || isCreatingReply,
  };
};
