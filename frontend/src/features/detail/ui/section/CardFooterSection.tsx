import { Chip } from "../../../../components/common/display";
import type { SubmissionDetails } from "../../../../apis/types/submission/checkSubmissionDetails";

export interface CardFooterProps {
  submission: SubmissionDetails["work"];
  className?: string;
}

const CardFooter = ({ submission, className = "" }: CardFooterProps) => {
  const { title, caption, tags, upload_at } = submission;

  return (
    <div
      className={`flex flex-col gap-2 items-start self-stretch ${className}`}
    >
      <div>
        <h2 className="text-sub-title-xlarge font-semibold py-2">{title}</h2>
        {caption ? (
          <p className="text-body-xlarge text-on-surface-variant mt-1">{caption}</p>
        ) : null}
      </div>

      <div className="flex gap-2 flex-wrap py-4">
        {Array.isArray(tags) && tags.length > 0
          ? tags.map((t) => (
              <Chip
                key={t}
                label={`#${t}`}
                variant="filled"
                className="pointer-events-none !bg-on-surface-variant-lowest"
              />
            ))
          : null}
      </div>

      <div className="text-label-large font-bold text-on-surface-variant-low">{upload_at}</div>
    </div>
  );
};

export default CardFooter;
