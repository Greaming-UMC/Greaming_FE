import { memo } from "react";
import { Chatting } from "../../../../components/chatting";
import type { CommentDetail } from "../../../../apis/types/submission/checkSubmissionDetails";
import type { CreateCommentResult } from "../../../../apis/types/submission/createComment";
import { useCommentTransform } from "../../hooks/useCommentTransform";
import { useReplies } from "../../hooks/useReplies";
import { useCommentInput } from "../../hooks/useCommentInput";
import CommentList from "./CommentList";

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
    <div className="h-[51.25rem] w-[21.5rem] items-end gap-10px justify-flex ">
      <Chatting.Root>
        {/* 최적화: CommentList는 comments가 변경될 때만 리렌더 */}
        <CommentList
          comments={comments}
          onReply={startReply}
          toggleReply={toggleReply}
          getReplyState={getReplyState}
        />

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

        {/* 최적화: Input은 text 변경 시에만 리렌더 - 이 부분만 격리됨 */}
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

// 최적화: React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
export default memo(ChattingSection);
