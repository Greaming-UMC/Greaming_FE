import { useState, useCallback } from 'react';
import { getCommentReplies } from '../api/api';
import type { ReplyDetail } from '../../../apis/types/submission/getCommentReplies';

/**
 * 답글 상태 인터페이스
 */
interface ReplyState {
  isOpen: boolean;
  replies: ReplyDetail[];
  isLoading: boolean;
  replyCount: number;
}

/**
 * 답글 관련 모든 상태와 로직을 관리하는 훅
 * 
 * @returns 답글 관리를 위한 상태와 메서드
 */
export const useReplies = () => {
  const [openReplyIds, setOpenReplyIds] = useState<Record<number, boolean>>({});
  const [replies, setReplies] = useState<Record<number, ReplyDetail[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Record<number, boolean>>({});
  const [replyCounts, setReplyCounts] = useState<Record<number, number>>({});

  /**
   * 답글 보기/숨기기 토글 및 데이터 로딩
   */
  const toggleReply = useCallback(async (commentId: number) => {
    const isOpen = !!openReplyIds[commentId];
    
    // 처음 열 때 답글 데이터가 없으면 API 호출
    if (!isOpen && !replies[commentId]) {
      setLoadingReplies((prev) => ({ ...prev, [commentId]: true }));
      try {
        const response = await getCommentReplies(commentId, {});
        if (response.isSuccess && response.result) {
          const replyResult = response.result;
          setReplyCounts((prev) => ({ ...prev, [commentId]: replyResult.totalCount }));
          setReplies((prev) => ({ ...prev, [commentId]: replyResult.replies }));
        } else {
          alert(`답글을 불러오는 데 실패했습니다: ${response.message}`);
        }
      } catch (error) {
        console.error('답글을 불러오는 데 실패했습니다.', error);
        alert('답글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoadingReplies((prev) => ({ ...prev, [commentId]: false }));
      }
    }
    setOpenReplyIds((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  }, [openReplyIds, replies]);

  /**
   * 새 답글 추가
   */
  const addReply = useCallback((commentId: number, newReply: ReplyDetail) => {
    setReplies((prev) => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), newReply],
    }));
    
    setReplyCounts((prev) => {
      const currentCount = prev[commentId] ?? 0;
      return { ...prev, [commentId]: currentCount + 1 };
    });
    
    // 답글 목록이 닫혀 있었다면 열어줌
    setOpenReplyIds((prev) => {
      if (!prev[commentId]) {
        return { ...prev, [commentId]: true };
      }
      return prev;
    });
  }, []);

  /**
   * 특정 댓글의 답글 상태 조회
   */
  const getReplyState = useCallback((commentId: number, defaultReplyCount = 0): ReplyState => {
    return {
      isOpen: !!openReplyIds[commentId],
      replies: replies[commentId] || [],
      isLoading: !!loadingReplies[commentId],
      replyCount: replyCounts[commentId] ?? defaultReplyCount,
    };
  }, [openReplyIds, replies, loadingReplies, replyCounts]);

  return {
    toggleReply,
    addReply,
    getReplyState,
  };
};
