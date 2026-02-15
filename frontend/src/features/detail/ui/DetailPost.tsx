import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardFooter from "./section/CardFooterSection";
import CardHeader from "./section/CardHeaderSection";
import CardMain from "./section/CardMainSection";
import ChattingSection from "./section/ChattingSection";
import { Dropdown } from "../../../components/common/feedback";
import { Button, ListBase } from "../../../components/common/input";
import type {
  CommentDetail,
  WorkDetail,
} from "../../../apis/types/submission/checkSubmissionDetails";
import type { CreateCommentResult } from "../../../apis/types/submission/createComment";
import { deleteSubmission } from "../api/api";

export interface DetailPostProps {
  submission: WorkDetail;
  comment_list?: CommentDetail[];
  submissionId: number;
  onCommentCreated: (newComment: CreateCommentResult) => void;
  isMe: boolean;
  currentUserProfileImg: string | null;
}

const DetailPost = ({
  submission,
  comment_list,
  submissionId,
  onCommentCreated,
  isMe,
  currentUserProfileImg,
}: DetailPostProps) => {
 const {
    nickname,
    profileImageUrl,
    level,
    image_list,
    title,
    caption,
    tags,
    upload_at,
  } = submission;

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await deleteSubmission(submissionId);
      if (response.isSuccess) {
        alert("게시물이 삭제되었습니다.");
        navigate("/"); // 홈으로 이동
      } else {
        alert(`삭제 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
      alert("게시물을 삭제하는 동안 오류가 발생했습니다.");
    }
  };

  return (
    <div className=" w-full mx-auto ">
      <div className="items-start flex">
        <div className="flex flex-wrap lg:flex-nowrap gap-y-8 w-full">
          {/* Left: Post content */}
          <div className="flex-1 flex-col items-start gap-[72px] relative min-w-0">
            <CardHeader
              nickname={nickname}
              profileImageUrl={profileImageUrl}
              level={level}
              rightNode={
                isMe ? (
                  <Dropdown
                    open={isMenuOpen}
                    onOpenChange={setIsMenuOpen}
                    align="right"
                    menuClassName="bg-surface rounded-md shadow-extra-small p-[8px] min-w-[150px]"
                    trigger={
                      <Button
                        variant="text"
                        size="none"
                        shape="round"
                        widthMode="fixed"
                        width="40px"
                        icon="dots"
                        iconPosition="leading"
                        aria-label="메뉴 열기"
                      />
                    }
                  >
                    <ListBase
                      variant="modal"
                      size="md"
                      radius="sm"
                      leadingIcon="edit"
                      title="수정하기"
                      widthMode="fill"
                      onClick={() => {
                        setIsMenuOpen(false);
                        console.log("수정 기능은 아직 구현되지 않았습니다.");
                      }}
                    />
                    <ListBase
                      variant="modal"
                      size="md"
                      radius="sm"
                      leadingIcon="delete"
                      title="삭제하기"
                      widthMode="fill"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleDelete();
                      }}
                    />
                  </Dropdown>
                ) : null
              }
            />
            <div className="mt-4 w-full">
              <CardMain image_list={image_list} title={title} />
            </div>

            <div className="mt-[72px]">
              <CardFooter
                title={title}
                caption={caption}
                tags={tags}
                upload_at={upload_at}
              />
            </div>
          </div>
          <div className="w-[20px]"></div>
          <aside className="w-full lg:w-[360px] shrink-0 mt-10">
            <div className="bg-surface border border-surface-variant-high rounded-md shadow-sm overflow-hidden h-fit  top-4">
              <ChattingSection
                comment_list={comment_list}
                submissionId={submissionId}
                onCommentCreated={onCommentCreated}
                userAvatarSrc={currentUserProfileImg}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// 최적화: React.memo를 사용하여 props가 변경되지 않으면 DetailPost 컴포넌트가 불필요하게
// 리렌더링되는 것을 방지합니다.
export default memo(DetailPost);
