import CardFooter from "./section/CardFooterSection";
import CardHeader from "./section/CardHeaderSection";
import CardMain from "./section/CardMainSection";
import ChattingSection from "./section/ChattingSection";
import type {
  SubmissionDetails,
  commentMetaData,
} from "../../../apis/types/submission/checkSubmissionDetails";

export interface DetailPostProps {
  submission: SubmissionDetails["submission"];
  comment_list?: commentMetaData[];
}

const DetailPost = ({ submission, comment_list }: DetailPostProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="gap-[20px] items-start flex">
        <div className="flex flex-wrap lg:flex-nowrap gap-x-[18px] gap-y-8">
          {/* Left: Post content */}
          <div className="flex-1 flex-col items-start gap-[72px] relative">
            <CardHeader submission={submission} />
            <div className="mt-4 w-full">
              <CardMain submissions={[submission]} />
            </div>

            <div className="mt-6">
              <CardFooter submission={submission} />
            </div>
          </div>

          {/* Right: Chat panel - fixed width, visually separated */}
          <aside className="w-full lg:w-[360px] lg:shrink-0">
            <div className="bg-white border border-gray-100 rounded-md shadow-sm overflow-hidden">
              <ChattingSection comment_list={comment_list} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
