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
 * 게시물의 정적 콘텐츠를 생성하는 Hook
 * CardHeader와 mainContent를 별도로 반환하여
 * CardMain과 ChattingSection이 같은 높이에서 시작할 수 있도록 함
 */
export const usePostContent = ({
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
  // useMemo 제거 - headerRightNode가 변경될 때 즉시 반영되도록
  return {
    header: (
      <CardHeader
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        level={level}
        rightNode={headerRightNode}
      />
    ),
    mainContent: (
      <div className="flex-1 flex-col items-start gap-[72px] relative min-w-0">
        <CardMain image_list={image_list} title={title} />
        
        <div className="mt-[72px]">
          <CardFooter
            title={title}
            caption={caption}
            tags={tags}
            upload_at={upload_at}
          />
        </div>
      </div>
    ),
  };
};
