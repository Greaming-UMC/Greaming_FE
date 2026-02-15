import { memo } from "react";
import CardHeader from "./CardHeaderSection";
import CardMain from "./CardMainSection";
import CardFooter from "./CardFooterSection";

export interface PostContentProps {
  nickname: string;
  profileImageUrl: string;
  level: string;
  image_list: string[];
  title: string;
  caption: string | null;
  tags: string[];
  upload_at: string;
  headerRightNode?: React.ReactNode;
}

/**
 * 게시물의 정적 콘텐츠를 렌더링하는 컴포넌트
 * 댓글이 추가되어도 리렌더되지 않도록 분리됨
 */
const PostContent = ({
  nickname,
  profileImageUrl,
  level,
  image_list,
  title,
  caption,
  tags,
  upload_at,
  headerRightNode,
}: PostContentProps) => {
  return (
    <div className="flex-1 flex-col items-start gap-[72px] relative min-w-0">
      <CardHeader
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        level={level}
        rightNode={headerRightNode}
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
  );
};

// 최적화: React.memo로 props가 변경되지 않으면 리렌더링 방지
export default memo(PostContent);
