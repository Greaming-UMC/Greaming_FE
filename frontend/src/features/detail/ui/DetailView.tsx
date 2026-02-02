import type { commentMetaData } from "../../../../apis/types/submission/checkSubmissionDetails";
import ArtistArtwork from "./ArtistArtwork";
import DetailPost from "./DetailPost";
import RecommendedGrid from "./section/RecommendedGrid";

const DetailView = () => {
  const mockSubmission = {
    nickname: "테스트 작가",
    profileImageUrl: "sample-profile.jpg",
    level: "ARTIST",
    image_list: [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/400/300?random=2",
      "https://picsum.photos/400/300?random=3",
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
  ];

  const myArtData = [
    { id: 101, title: "붉은 노을", src: "https://picsum.photos/id/10/400/400" },
    { id: 102, title: "푸른 바다", src: "https://picsum.photos/id/11/400/400" },
    { id: 103, title: "고요한 숲", src: "https://picsum.photos/id/12/400/400" },
    { id: 104, title: "도시의 밤", src: "https://picsum.photos/id/13/400/400" },
    { id: 105, title: "아침 햇살", src: "https://picsum.photos/id/14/400/400" },
    { id: 106, title: "겨울 풍경", src: "https://picsum.photos/id/15/400/400" },
    { id: 107, title: "봄의 정원", src: "https://picsum.photos/id/16/400/400" },
    { id: 108, title: "가을 낙엽", src: "https://picsum.photos/id/17/400/400" },
  ];

  return (
    <div className="w-full min-h-screen h-fit flex flex-col items-center gap-12 pb-24 p-10 mt-16">
      <div className="shrink-0">
        <DetailPost submission={mockSubmission} comment_list={mockComments} />
      </div>
      <div className="shrink-0">
        <ArtistArtwork artworks={myArtData} userRole="USER" />
      </div>
      <div className="w-full shrink-0">
        <RecommendedGrid />
      </div>
    </div>
  );
};

export default DetailView;
