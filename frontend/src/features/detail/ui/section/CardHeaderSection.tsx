import type { ReactNode } from "react";
import { Avatar, Badge } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import type { SubmissionDetails } from "../../../../apis/types/submission/checkSubmissionDetails";

export interface CardHeaderSectionProps {
    submission: SubmissionDetails["submission"];
    rightNode?: ReactNode;
    className?: string;
}

const CardHeader = ({ submission, rightNode, className = "" }: CardHeaderSectionProps) => {
    const { nickname, profileImageUrl, level, counters, upload_at } = submission;
    return (
        <div
            className={`flex items-center justify-between gap-4 ${className}`}
            role="group"
        >
            <div className="flex items-center gap-3 min-w-0">
                <Avatar src={profileImageUrl} size="md" />

                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold truncate">{nickname}</h3>
                        {/* level 표시: 아이콘은 badge_{level} 네이밍을 사용 */}
                        <Badge
                            variant="primary"
                            size="sm"
                            icon={`badge_${String(level).toLowerCase()}`}
                        />
                    </div>

                    <p className="text-xs text-on-surface-variant truncate">{upload_at}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {rightNode ?? (
                    <div className="flex items-center gap-2">
                        <Badge label={String(counters.likesCount)} variant="neutral" size="sm" />
                        <Badge label={String(counters.commentCount)} variant="neutral" size="sm" />
                        <Badge label={String(counters.bookmarkCount)} variant="neutral" size="sm" />
                        <button
                            type="button"
                            className="p-2 rounded-full hover:bg-surface-variant"
                            aria-label="open menu"
                        >
                            <Icon name="more-horizontal" size={18} className="fill-current" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardHeader;