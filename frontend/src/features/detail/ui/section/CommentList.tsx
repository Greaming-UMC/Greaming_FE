import { memo } from "react";
import { Chatting } from "../../../../components/chatting";
import CommentItem from "./CommentItem";

export interface CommentListProps {
  comments: Array<{
    id: number;
    userId: number;
    nickname: string;
    content: string;
    date?: string;
    avatarSrc?: string | null;
    isLike?: boolean;
    replyCount?: number;
  }>;
  onReply: (comment: any) => void;
  toggleReply: (commentId: number) => void;
  getReplyState: (commentId: number, replyCount: number) => any;
  onLoadMoreComments: () => void;
  hasMoreComments: boolean;
}

/**
 * 댓글 목록 렌더링 컴포넌트
 * 각 CommentItem이 좋아요 상태를 로컬로 관리하므로
 * 좋아요 클릭 시 이 컴포넌트는 리렌더되지 않음
 */
const CommentList = ({
  comments,
  onReply,
  toggleReply,
  getReplyState,
  onLoadMoreComments,
  hasMoreComments,
}: CommentListProps) => {
  return (
    <>
      <Chatting.Header />
      <Chatting.List>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={onReply}
            toggleReply={toggleReply}
            getReplyState={getReplyState}
          />
        ))}
        {hasMoreComments && (
          <button
            onClick={onLoadMoreComments}
            className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors border-t border-gray-100 mt-2"
          >
            댓글 더보기
          </button>
        )}
      </Chatting.List>
    </>
  );
};

// memo: comments 배열 참조가 바뀔 때만 리렌더 (좋아요는 CommentItem 내부에서 처리)
export default memo(CommentList);
