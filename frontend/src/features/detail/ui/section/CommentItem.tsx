import { memo, useState, useCallback } from "react";
import { Chatting } from "../../../../components/chatting";
import { useProfileNavigation } from "../../hooks/useProfileNavigation";
import { toggleCommentLike } from "../../api/api";

interface CommentItemData {
  id: number;
  userId: number;
  nickname: string;
  content: string;
  date?: string;
  avatarSrc?: string | null;
  isLike?: boolean;
  replyCount?: number;
}

interface CommentItemProps {
  comment: CommentItemData;
  onReply: (comment: CommentItemData) => void;
  toggleReply: (commentId: number) => void;
  getReplyState: (commentId: number, replyCount: number) => any;
}

/**
 * 개별 댓글 아이템
 * 좋아요 상태를 로컬에서 관리해 부모 리렌더 없이 즉각 반영
 */
const CommentItem = memo(
  ({ comment, onReply, toggleReply, getReplyState }: CommentItemProps) => {
    const { navigateToProfile } = useProfileNavigation();
    const [isLiked, setIsLiked] = useState(comment.isLike ?? false);

    const handleToggleLike = useCallback(async () => {
      // 낙관적 업데이트
      setIsLiked((prev) => !prev);
      try {
        const response = await toggleCommentLike(comment.id);
        if (response.isSuccess && response.result) {
          setIsLiked(response.result.isLiked);
        } else {
          setIsLiked((prev) => !prev); // 롤백
        }
      } catch {
        setIsLiked((prev) => !prev); // 롤백
      }
    }, [comment.id]);

    const replyState = getReplyState(comment.id, comment.replyCount ?? 0);
    const hasReplies = replyState.replyCount > 0;

    return (
      <div className="flex flex-col">
        <Chatting.Item
          avatarSrc={comment.avatarSrc ?? `https://i.pravatar.cc/150?u=${comment.id}`}
          nickname={comment.nickname}
          content={comment.content}
          date={comment.date}
          onReply={() => onReply(comment)}
          isLiked={isLiked}
          onLike={handleToggleLike}
          onAvatarClick={() => navigateToProfile(comment.userId)}
        />

        {hasReplies && (
          <Chatting.ReplySeparator
            isOpen={replyState.isOpen}
            replyCount={replyState.replyCount}
            onClick={() => toggleReply(comment.id)}
          />
        )}

        {replyState.isOpen && (
          <div className="flex flex-col">
            {replyState.isLoading && (
              <div className="pl-14 text-sm text-on-surface-variant py-2">
                답글 로딩 중...
              </div>
            )}
            {replyState.replies.map((reply: any) => (
              <Chatting.Item
                key={reply.replyId}
                isReply
                avatarSrc={reply.writer_profileImgUrl}
                nickname={reply.writer_nickname}
                content={reply.content}
                date={reply.createdAt}
                onAvatarClick={() => navigateToProfile(reply.userId)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

CommentItem.displayName = "CommentItem";
export default CommentItem;
