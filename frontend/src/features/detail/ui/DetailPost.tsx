import CardFooter from "./section/CardFooterSection";
import CardHeader from "./section/CardHeaderSection";
import CardMain from "./section/CardMainSection";
import ChattingSection from "./section/ChattingSection";
import type {
  SubmissionDetails,
  CommentDetail,
} from "../../../apis/types/submission/checkSubmissionDetails";

export interface DetailPostProps {
  submission: SubmissionDetails["work"];
  comment_list?: CommentDetail[];
}

const DetailPost = ({ submission, comment_list }: DetailPostProps) => {
  return (
    <div className=" w-full mx-auto ">
      <div className="items-start flex">
        <div className="flex flex-wrap lg:flex-nowrap gap-y-8 w-full">
          
          {/* Left: Post content */}
          <div className="flex-1 flex-col items-start gap-[72px] relative min-w-0">
            <CardHeader submission={submission} />
            <div className="mt-4 w-full">
              <CardMain submissions={[submission]} />
            </div>

            <div className="mt-[72px]">
              <CardFooter submission={submission} />
            </div>
          </div>
          <div className="w-[20px]"></div>
          <aside className="w-full lg:w-[360px] shrink-0 mt-10">
            <div className="bg-surface border border-surface-variant-high rounded-md shadow-sm overflow-hidden h-fit  top-4">
              <ChattingSection comment_list={comment_list} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
