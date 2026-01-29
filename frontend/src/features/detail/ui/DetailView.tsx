import CardFooter from "./section/CardFooterSection";
import CardHeader from "./section/CardHeaderSection";
import ChattingSection from "./section/ChattingSection";
import type { commentMetaData } from "../../../../apis/types/submission/checkSubmissionDetails";
import CardMain from "./section/CardMainSection";
import DetailPost from "./DetailPost";

const DetailView = () => {

    const mockSubmission = {
        nickname: "테스트 작가",
        profileImageUrl: "sample-profile.jpg",
        level: "ARTIST",
        image_list: ["https://picsum.photos/400/300?random=1", "https://picsum.photos/400/300?random=2", "https://picsum.photos/400/300?random=3"],
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

    return (
        <div className="flex justify-center">
            <DetailPost submission={mockSubmission} comment_list={mockComments} />
        </div>
    );
}



export default DetailView;