import type { ReactNode } from "react";
import { Avatar, Badge, Chip } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import type { SubmissionDetails } from "../../../../apis/types/submission/checkSubmissionDetails";

export interface CardHeaderSectionProps {
  submission: SubmissionDetails["work"];
  rightNode?: ReactNode;
  className?: string;
}

const CardHeader = ({
  submission,
  rightNode,
  className = "",
}: CardHeaderSectionProps) => {
  const { nickname, profileImageUrl, level } = submission;
  return (
    <div
      className={`flex items-center justify-between self-stretch ${className}`}
      role="group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar src={profileImageUrl} size="md" />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sub-title-xlarge  font-semibold truncate">{nickname}</h3>
            <Badge
              variant="primary"
              size="sm"
              icon={`badge_${String(level).toLowerCase()}`}
            />
          </div>

        
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rightNode ?? (<>
          <Icon name="dots_vertical" size={20}/>
        </> 
        )}
      </div>
    </div>
  );
};

export default CardHeader;
