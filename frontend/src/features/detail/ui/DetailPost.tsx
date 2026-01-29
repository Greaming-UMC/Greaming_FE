import CardFooter from "./section/CardFooterSection";
import CardHeader from "./section/CardHeaderSection";
import CardMain from "./section/CardMainSection";
import ChattingSection from "./section/ChattingSection";
import type { SubmissionDetails, commentMetaData } from "../../../apis/types/submission/checkSubmissionDetails";

export interface DetailPostProps {
    submission: SubmissionDetails["submission"];
    comment_list?: commentMetaData[];
}

const DetailPost = ({ submission, comment_list }: DetailPostProps) => {
    return (
        <div className="w-full">
            <div className="mx-auto px-6">
                <div className="flex flex-row items-start gap-8">
                    {/* Left: Post content */}
                    <div className="flex-1 w-[840px] h-[1031px] relative">
                        <CardHeader submission={submission} />
                        <div className="mt-4 w-full h-[840px]">
                          <CardMain submissions={[submission]} />
                        </div>

                        <div className="mt-6 absolute bottom-0">
                          <CardFooter submission={submission} />
                        </div>
                    </div>

                    {/* Right: Chat panel - fixed width, visually separated */}
                    <aside className="w-[360px]">
                        <div className="sticky top-20">
                            <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
                                <ChattingSection comment_list={comment_list} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default DetailPost;