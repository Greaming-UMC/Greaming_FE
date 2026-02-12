import { useState, useMemo, type KeyboardEvent } from "react";
import { Chatting } from "../../../../components/chatting";
import type { CommentDetail } from "../../../../apis/types/submission/checkSubmissionDetails";
import { createComment, getCommentReplies, createReply } from "../../api/api";
import type { CreateCommentResult } from "../../../../apis/types/submission/createComment";
import type { ReplyDetail } from "../../../../apis/types/submission/getCommentReplies";

type Reply = {
  id: number;
  nickname: string;
  content: string;
  date?: string;
  avatarSrc?: string | null;
};

// UI에서 사용할 댓글 타입
type Comment = Reply & {
  replyCount?: number;
  isLike?: boolean;
  likeCount?: number;
};

// HACK: CommentDetail 타입에 commentId가 포함되어야 합니다.
// 부모로부터 받은 comment_list 타입에 commentId가 있다고 가정합니다.
// HACK: CommentDetail 타입에 replyCount와 createdAt도 포함되어야 합니다.
export interface ChattingSectionProps {
  comment_list?: (CommentDetail & {
    commentId?: number;
    replyCount?: number;
    createdAt?: string;
    // HACK: CommentDetail에 isLike, likeCount가 있다고 가정합니다.
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
  const [openReplyIds, setOpenReplyIds] = useState<Record<number, boolean>>({});
  const [text, setText] = useState("");
  const [replies, setReplies] = useState<Record<number, ReplyDetail[]>>({});
  const [loadingReplies, setLoadingReplies] = useState<Record<number, boolean>>(
    {}
  );
  // [개선] 답글의 전체 개수를 별도 상태로 관리하여 정확도를 높입니다.
  const [replyCounts, setReplyCounts] = useState<Record<number, number>>({});
  // 답글 대상(댓글 객체)을 저장하는 상태
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  // 최적화: comment_list prop이 변경될 때만 댓글 목록을 새로 계산합니다.
  const comments: Comment[] = useMemo(() => {
    if (!comment_list || !comment_list.length) return [];
    return comment_list.map((c, i) => ({
      // TODO: API 응답에 고유 ID(commentId)가 포함되어야 안정적인 key로 사용할 수 있습니다.
      id: c.commentId ?? i,
      nickname: c.writer_nickname,
      avatarSrc: c.writer_profileImgUrl,
      content: c.content,
      date: c.createdAt ?? "",
      replyCount: c.replyCount ?? 0,
      isLike: c.isLike ?? false,
      likeCount: c.likeCount ?? 0,
    }));
  }, [comment_list]);

  // 답글 보기/숨기기 토글 및 데이터 로딩
  const toggleReply = async (id: number) => {
    const isOpen = !!openReplyIds[id];
    // 처음 열 때 답글 데이터가 없으면 API 호출
    if (!isOpen && !replies[id]) {
      setLoadingReplies((prev) => ({ ...prev, [id]: true }));
      try {
        const response = await getCommentReplies(id, {});
        if (response.isSuccess && response.result) {
          const replyResult = response.result;
          setReplyCounts((prev) => ({ ...prev, [id]: replyResult.totalCount }));
          setReplies((prev) => ({ ...prev, [id]: replyResult.replies }));
        } else {
          alert(`답글을 불러오는 데 실패했습니다: ${response.message}`);
        }
      } catch (error) {
        console.error("답글을 불러오는 데 실패했습니다.", error);
        alert("답글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoadingReplies((prev) => ({ ...prev, [id]: false }));
      }
    }
    setOpenReplyIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 답글 달기 시작 (대상을 상태에 저장하고 입력창 포커스 유도)
  const handleStartReply = (comment: Comment) => {
    setReplyingTo(comment);
    setText(""); // 기존 입력 내용 초기화 (선택 사항)
  };

  // 답글 달기 취소
  const handleCancelReply = () => {
    setReplyingTo(null);
    setText("");
  };

  // 댓글 또는 답글 전송 핸들러
  const handleSubmit = async () => {
    if (!text.trim()) return;

    // 1. 답글 모드일 경우
    if (replyingTo) {
      try {
        const response = await createReply(replyingTo.id, { content: text });
        if (response.isSuccess && response.result) {
          const newApiReply = response.result;
          // API 응답 형식을 UI에서 사용하는 ReplyDetail 형식으로 변환
          const newReply: ReplyDetail = {
            replyId: newApiReply.replyId,
            userId: 0, // createReply 응답에 userId가 없으므로 임시값 사용
            writer_nickname: newApiReply.writer_nickname,
            writer_profileImgUrl: newApiReply.writer_profileImgUrl,
            content: newApiReply.content,
            createdAt: newApiReply.createdAt,
            isWriter: true, // 방금 작성했으므로 isWriter는 true
            isLike: newApiReply.isLike,
            likeCount: newApiReply.likeCount,
          };

          // 답글 상태 업데이트
          setReplies((prev) => ({
            ...prev,
            [replyingTo.id]: [...(prev[replyingTo.id] || []), newReply],
          }));

          // 답글 개수 상태 업데이트
          setReplyCounts((prev) => {
            const currentCount = prev[replyingTo.id] ?? replyingTo.replyCount ?? 0;
            return { ...prev, [replyingTo.id]: currentCount + 1 };
          });

          // 답글 목록이 닫혀 있었다면 열어줌
          if (!openReplyIds[replyingTo.id]) {
            setOpenReplyIds((prev) => ({ ...prev, [replyingTo.id]: true }));
          }
          setText(""); // 입력창 비우기
          handleCancelReply(); // 답글 모드 종료
        } else {
          alert(`답글 작성 실패: ${response.message}`);
        }
      } catch (error) {
        console.error("답글 작성 중 오류 발생:", error);
        alert("답글을 작성하는 동안 오류가 발생했습니다.");
      }
    } else {
      // 2. 일반 댓글 모드일 경우
      try {
        const response = await createComment({
          submissionId: submissionId,
          content: text,
        });
        if (response.isSuccess && response.result) {
          onCommentCreated(response.result);
          setText("");
        } else {
          alert(`댓글 작성 실패: ${response.message}`);
        }
      } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
        alert("댓글을 작성하는 동안 오류가 발생했습니다.");
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Shift 키를 누르지 않은 상태에서 Enter 키를 누르면 전송
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 동작(줄바꿈) 방지
      handleSubmit();
    }
  };

  return (
    <div className="h-[51.25rem] w-[21.5rem] items-end gap-10px justify-flex bg-on-primary">
      <Chatting.Root>
        <Chatting.Header />
        <Chatting.List>
          {comments.map((comment) => {
            const isOpen = !!openReplyIds[comment.id];
            const currentReplies = replies[comment.id] || [];

            const displayReplyCount = replyCounts[comment.id] ?? comment.replyCount ?? 0;
            const hasReplies = displayReplyCount > 0;

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
                  // 답글 달기 버튼 클릭 시 해당 댓글 객체 전체를 전달
                  onReply={() => handleStartReply(comment)}
                  isLiked={comment.isLike}
                  likeCount={comment.likeCount}
                  onLike={() => {
                    /* 댓글 좋아요 처리 로직 추가 예정 */
                  }}
                />

                {hasReplies && (
                  <Chatting.ReplySeparator
                    isOpen={isOpen}
                    replyCount={displayReplyCount}
                    onClick={() => toggleReply(comment.id)}
                  />
                )}

                {isOpen && (
                  <div className="flex flex-col">
                    {loadingReplies[comment.id] && (
                      <div className="pl-14 text-sm text-gray-500 py-2">
                        답글 로딩 중...
                      </div>
                    )}
                    {currentReplies.map((reply) => (
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

        {/* 답글 모드일 때 입력창 위에 표시되는 UI */}
        {replyingTo && (
          <div className="px-4 py-2 text-xs text-gray-500 flex justify-between items-center bg-gray-50 border-t border-gray-100">
            <span>@{replyingTo.nickname}님에게 답글 남기는 중...</span>
            <button 
              onClick={handleCancelReply} 
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
          // 답글 모드에 따라 placeholder 변경
          placeholder={replyingTo ? "답글을 입력하세요..." : "댓글 달기..."}
        />
      </Chatting.Root>
    </div>
  );
};

export default ChattingSection;
