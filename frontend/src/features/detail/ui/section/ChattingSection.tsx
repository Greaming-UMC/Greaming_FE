import { useState } from "react";
import { Chatting } from "../../../../components/chatting";
import type { commentMetaData } from "../../../../apis/types/submission/checkSubmissionDetails";

type Reply = {
  id: number;
  nickname: string;
  content: string;
  date?: string;
};

type Comment = Reply & { replies?: Reply[]; avatarSrc?: string | null };


export interface ChattingSectionProps {
  comment_list?: commentMetaData[];
}

const ChattingSection = ({ comment_list }: ChattingSectionProps) => {
  const [openReplyIds, setOpenReplyIds] = useState<Record<number, boolean>>({});
  const [text, setText] = useState("");

  // Convert API comment_list to internal Comment[] (flat list, no replies)
  const comments: Comment[] = (comment_list && comment_list.length
    ? comment_list.map((c, i) => ({
        id: i + 1,
        nickname: c.writer_nickname,
        avatarSrc: c.writer_profileImgUrl,
        content: c.content,
        date: "",
        replies: [],
      }))
    : []) as Comment[];

  const toggleReply = (id: number) => {
    setOpenReplyIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    // 현재는 실제 전송 로직 없음 — 콘솔로 확인하고 입력 비우기
    console.log("submit comment:", text);
    setText("");
  };

  return (
    <div className="h-[820px] w-[334px]">
      <Chatting.Root>
        <Chatting.Header />
        <Chatting.List>
          {comments.map((comment) => {
            const isOpen = !!openReplyIds[comment.id];
            const hasReplies = (comment.replies || []).length > 0;

            return (
              <div key={comment.id} className="flex flex-col">
                <Chatting.Item
                  avatarSrc={comment.avatarSrc ?? `https://i.pravatar.cc/150?u=${comment.id}`}
                  nickname={comment.nickname}
                  content={comment.content}
                  date={comment.date}
                />

                {hasReplies && (
                  <Chatting.ReplySeparator
                    isOpen={isOpen}
                    replyCount={(comment.replies || []).length}
                    onClick={() => toggleReply(comment.id)}
                  />
                )}

                {isOpen && hasReplies && (
                  <div className="flex flex-col">
                    {(comment.replies || []).map((reply) => (
                      <Chatting.Item
                        key={reply.id}
                        isReply
                        avatarSrc={`https://i.pravatar.cc/150?u=${reply.id}`}
                        nickname={reply.nickname}
                        content={reply.content}
                        date={reply.date ?? ""}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </Chatting.List>

        <Chatting.Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={handleSubmit}
          userAvatarSrc={""}
        />
      </Chatting.Root>
    </div>
  );
};

export default ChattingSection;