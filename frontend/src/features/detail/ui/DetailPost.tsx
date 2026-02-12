import { memo } from "react";
import CardFooter from "./section/CardFooterSection";
import Icon from "../../../components/common/Icon";
import CardHeader from "./section/CardHeaderSection";
import CardMain from "./section/CardMainSection";
import ChattingSection from "./section/ChattingSection";
import type {
  CommentDetail,
  WorkDetail,
} from "../../../apis/types/submission/checkSubmissionDetails";
import type { CreateCommentResult } from "../../../apis/types/submission/createComment";

export interface DetailPostProps {
  submission: WorkDetail;
  comment_list?: CommentDetail[];
  submissionId: number;
  onCommentCreated: (newComment: CreateCommentResult) => void;
  isMe: boolean;
}

const DetailPost = ({
  submission,
  comment_list,
  submissionId,
  onCommentCreated,
  isMe,
}: DetailPostProps) => {
  // 최적화: submission 객체를 분해하여 하위 컴포넌트에 필요한 props만 전달합니다.
  // 이렇게 하면 submission 객체의 다른 부분이 변경되어도(예: comment_count)
  // 관련 없는 컴포넌트(CardHeader, CardMain, CardFooter)가 리렌더링되는 것을 방지할 수 있습니다.
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
                isMe ? <Icon name="dots_horizontal" size={20} /> : <></>
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
                userAvatarSrc={profileImageUrl}
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
