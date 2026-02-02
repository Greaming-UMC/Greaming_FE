import type { commentMetaData } from "../../../apis/types/submission";
import Icon from "../../../components/common/Icon";
import ArtistArtwork from "./ArtistArtwork";
import DetailPost from "./DetailPost";
import ActionSideBar from "./section/ActionSideBar";
import RecommendedGrid from "./section/RecommendedGrid";

const DetailView = () => {
  const mockSubmission = {
    nickname: "테스트 작가",
    profileImageUrl: "sample-profile.jpg",
    level: "ARTIST",
    image_list: [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/300/400?random=2",
      "https://picsum.photos/400/400?random=3",
      "https://picsum.photos/300/300?random=4",
    ],
    counters: { likesCount: 12, commentCount: 3, bookmarkCount: 5 },
    title: "샘플 작품 제목",
    caption: "간단한 작품 설명입니다.",
    tags: ["digital", "illustration"],
    upload_at: "2023-01-01T12:00:00Z",
  };

  const mockComments: commentMetaData[] = [
    {
      writer_nickname: "유저A",
      writer_profileImgUrl: "https://i.pravatar.cc/150?img=1",
      content: "멋진 작품이네요! 색감이 마음에 들어요.",
      isLike: false,
    },
    {
      writer_nickname: "유저B",
      writer_profileImgUrl: "https://i.pravatar.cc/150?img=2",
      content: "특히 질감 표현이 인상적입니다.",
      isLike: true,
    },
    {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
     {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
     {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    }, 
    {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
     {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
     {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
     {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
     {
      writer_nickname: "유저C",
      writer_profileImgUrl: "",
      content: "참고하고 싶은 스타일이네요.",
      isLike: false,
    },
  ];

  const myArtData = [
    {
      id: 1,
      title: "작품 1",
      src: "https://picsum.photos/200/300?random=11",
    },
    {
      id: 2,
      title: "작품 2",
      src: "https://picsum.photos/200/300?random=12",
    }

  
  ];

  return (
    <div className="relative w-full min-h-screen h-fit flex flex-col items-center gap-12 pb-24 p-10 mt-16 max-w-[1531px] mx-auto px-40">
      <aside className="absolute left-1 top-0 h-full hidden lg:block pointer-events-none z-10">
          <div className="sticky top-24 pt-[88px] pointer-events-auto">
            <ActionSideBar 
               likes={mockSubmission.counters.likesCount}
               comments={mockSubmission.counters.commentCount}
               scraps={mockSubmission.counters.bookmarkCount}
            />
          </div>
      </aside>
      <aside className="absolute right-1 top-0 h-full hidden lg:block pointer-events-none z-10">
          <div className="sticky top-145 pt-[88px] pointer-events-auto">
            <Icon name="upload_primary" size={64} />
          </div>
        </aside>
      <div className="shrink-0 w-full relative">
        <DetailPost submission={mockSubmission} comment_list={mockComments} />     
      </div>
      <div className="shrink-0  w-full">
        <ArtistArtwork artworks={myArtData} userRole="USER" />
      </div>
      <div className="w-full shrink-0">
        <RecommendedGrid />
      </div>
    </div>
  );
};

export default DetailView;
