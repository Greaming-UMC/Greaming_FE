import type { CommentDetail } from "../../../apis/types/submission/checkSubmissionDetails";
import Icon from "../../../components/common/Icon";
import ArtistArtwork from "./ArtistArtwork";
import DetailPost from "./DetailPost";
import ActionSideBar from "./section/ActionSideBar";
import RecommendedGrid from "./section/RecommendedGrid";
import type { RecommendedArt } from "../../../apis/types/art";

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
    likes_count: 12,
    comment_count: 3,
    bookmark_count: 5,
    title: "샘플 작품 제목",
    caption: "간단한 작품 설명입니다.",
    tags: ["digital", "illustration"],
    upload_at: "2023-01-01T12:00:00Z",
  };

  const mockComments: CommentDetail[] = [
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
  ];

  const myArtData = [
    {
      id: 1,
      title: "작품 1",
      src: "https://picsum.photos/200/300?random=11",
      likes_count: 120,
      comment_count: 12,
      bookmark_count: 3,
    },
    {
      id: 2,
      title: "작품 2",
      src: "https://picsum.photos/200/300?random=12",
      likes_count: 88,
      comment_count: 5,
      bookmark_count: 1,
    }

  
  ];

  const mockRecommendedArts: RecommendedArt[] = [
    {
      id: 101,
      src: "https://picsum.photos/300/300?random=21",
      title: "추천 작품 1: 고요한 호수",
      likes_count: 123,
      comment_count: 4,
      bookmark_count: 15,
    },
    {
      id: 102,
      src: "https://picsum.photos/300/300?random=22",
      title: "추천 작품 2: 도시의 밤",
      likes_count: 45,
      comment_count: 12,
      bookmark_count: 2,
    },
    {
      id: 103,
      src: "https://picsum.photos/300/300?random=23",
      title: "추천 작품 3: 숲속의 아침",
      likes_count: 99,
      comment_count: 8,
      bookmark_count: 22,
    },
    {
      id: 104,
      src: "https://picsum.photos/300/300?random=24",
      title: "추천 작품 4: 겨울 산책",
      likes_count: 256,
      comment_count: 23,
      bookmark_count: 45,
    },
    {
      id: 105,
      src: "https://picsum.photos/300/300?random=25",
      title: "추천 작품 5: 해변의 노을",
      likes_count: 180,
      comment_count: 15,
      bookmark_count: 30,
    },
    {
      id: 106,
      src: "https://picsum.photos/300/300?random=26",
      title: "추천 작품 6: 오래된 골목",
      likes_count: 77,
      comment_count: 3,
      bookmark_count: 7,
    },
    {
      id: 107,
      src: "https://picsum.photos/300/300?random=27",
      title: "추천 작품 7: 별이 빛나는 밤",
      likes_count: 301,
      comment_count: 35,
      bookmark_count: 50,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
     {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
     {
      id: 108,
      src: "https://picsum.photos/300/300?random=29",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
     {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
    {
      id: 108,
      src: "https://picsum.photos/300/300?random=28",
      title: "추천 작품 8: 비 오는 거리",
      likes_count: 112,
      comment_count: 9,
      bookmark_count: 11,
    },
  ];

  return (
    <div className="relative w-full min-h-screen h-fit flex flex-col items-center gap-12 pb-24 p-10 mt-16 max-w-[1531px] mx-auto px-40">
      <aside className="absolute left-1 top-0 h-full hidden lg:block pointer-events-none z-10">
          <div className="sticky top-24 pt-[88px] pointer-events-auto">
            <ActionSideBar 
               likes={mockSubmission.likes_count}
               comments={mockSubmission.comment_count}
               scraps={mockSubmission.bookmark_count}
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
        <ArtistArtwork artworks={myArtData} />
      </div>
      <div className="w-full shrink-0">
        <RecommendedGrid artworks={mockRecommendedArts} />
      </div>
    </div>
  );
};

export default DetailView;
