import { Chip } from "../../../../components/common/display";
import type { SubmissionDetails } from "../../../../apis/types/submission/checkSubmissionDetails";

export interface CardFooterProps {
    submission: SubmissionDetails["submission"];
    className?: string;
}

const CardFooter = ({ submission, className = "" }: CardFooterProps) => {
    const { title, caption, tags, upload_at } = submission;

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <div>
                <h2 className="text-base font-semibold">{title}</h2>
                {caption ? (
                    <p className="text-sm text-on-surface-variant mt-1">{caption}</p>
                ) : null}
            </div>

            <div className="flex gap-2 flex-wrap">
                {Array.isArray(tags) && tags.length > 0
                    ? tags.map((t) => (
                            <Chip key={t} label={`#${t}`} variant="filled" className="pointer-events-none" />
                        ))
                    : null}
            </div>

            <div className="text-xs text-on-surface-variant">{upload_at}</div>
        </div>
    );
};

export default CardFooter;