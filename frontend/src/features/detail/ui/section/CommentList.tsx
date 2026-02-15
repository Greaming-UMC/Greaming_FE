import { memo } from "react";
import { Chatting } from "../../../../components/chatting";

export interface CommentListProps {
  comments: Array<{
    id: number;
    nickname: string;
    content: string;
    date?: string;
    avatarSrc?: string;
    isLike?: boolean;
    likeCount?: number;
    replyCount: number;
  }>;
  onReply: (comment: any) => void;
  toggleReply: (commentId: number) => void;
  getReplyState: (commentId: number, replyCount: number) => any;
}

/**
 * 댓글 목록을 렌더링하는 컴포넌트
 * input value 변경 시 리렌더되지 않도록 분리됨
 */
const CommentList = ({
  comments,
  onReply,
  toggleReply,
  getReplyState,
}: CommentListProps) => {
  return (
    <>
      <Chatting.Header />
      <Chatting.List>
        {comments.map((comment) => {
          const replyState = getReplyState(comment.id, comment.replyCount);
          const hasReplies = replyState.replyCount > 0;

          return (
            <div key={comment.id} className="flex flex-col">
              <Chatting.Item
                avatarSrc={
                  comment.avatarSrc ??
                  `https://i.pravatar.cc/150?u=${comment.id}`
                }
                nickname={comment.nickname}
                content={comment.content}
                date={comment.date}
                onReply={() => onReply(comment)}
                isLiked={comment.isLike}
                likeCount={comment.likeCount}
                onLike={() => {
                  /* 댓글 좋아요 처리 로직 추가 예정 */
                }}
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
                      isLiked={reply.isLike}
                      likeCount={reply.likeCount}
                      onLike={() => {
                        /* 답글 좋아요 처리 로직 추가 예정 */
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Chatting.List>
    </>
  );
};

// 최적화: comments가 변경될 때만 리렌더
export default memo(CommentList);
