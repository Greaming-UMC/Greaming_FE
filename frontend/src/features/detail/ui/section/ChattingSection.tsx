import { Chatting } from "../../../../components/chatting";
import type { CommentDetail } from "../../../../apis/types/submission/checkSubmissionDetails";
import type { CreateCommentResult } from "../../../../apis/types/submission/createComment";
import { useCommentTransform } from "../../hooks/useCommentTransform";
import { useReplies } from "../../hooks/useReplies";
import { useCommentInput } from "../../hooks/useCommentInput";

export interface ChattingSectionProps {
  comment_list?: (CommentDetail & {
    commentId?: number;
    replyCount?: number;
    createdAt?: string;
    isLike?: boolean;
    likeCount?: number;
  })[];
  submissionId: number;
  onCommentCreated: (newComment: CreateCommentResult) => void;
  userAvatarSrc?: string | null;
}

const ChattingSection = ({
  comment_list,
  submissionId,
  onCommentCreated,
  userAvatarSrc,
}: ChattingSectionProps) => {
  // 데이터 변환
  const comments = useCommentTransform(comment_list);

  // 답글 관리
  const { toggleReply, addReply, getReplyState } = useReplies();

  // 입력 관리
  const {
    text,
    setText,
    replyingTo,
    startReply,
    cancelReply,
    handleSubmit,
    handleKeyDown,
    isSubmitting,
  } = useCommentInput({
    submissionId,
    onCommentCreated,
    onReplyCreated: addReply,
  });

  return (
    <div className="h-[51.25rem] w-[21.5rem] items-end gap-10px justify-flex bg-on-primary">
      <Chatting.Root>
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
                  onReply={() => startReply(comment)}
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
                      <div className="pl-14 text-sm text-gray-500 py-2">
                        답글 로딩 중...
                      </div>
                    )}
                    {replyState.replies.map((reply) => (
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

        {/* 답글 모드 표시 */}
        {replyingTo && (
          <div className="px-4 py-2 text-xs text-gray-500 flex justify-between items-center bg-gray-50 border-t border-gray-100">
            <span>@{replyingTo.nickname}님에게 답글 남기는 중...</span>
            <button
              onClick={cancelReply}
              className="text-gray-400 hover:text-gray-600 font-bold px-2"
            >
              &times;
            </button>
          </div>
        )}

        <Chatting.Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          userAvatarSrc={userAvatarSrc ?? undefined}
          placeholder={replyingTo ? "답글을 입력하세요..." : "댓글 달기..."}
          disabled={isSubmitting}
        />
      </Chatting.Root>
    </div>
  );
};

export default ChattingSection;
