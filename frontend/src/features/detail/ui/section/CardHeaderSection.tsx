import { memo, type ReactNode } from "react";
import { Avatar, Badge } from "../../../../components/common/display";
export interface CardHeaderSectionProps {
  nickname: string;
  profileImageUrl: string;
  level: string;
  rightNode?: ReactNode;
  className?: string;
}

const CardHeader = ({
  nickname,
  profileImageUrl,
  level,
  rightNode,
  className = "",
}: CardHeaderSectionProps) => {
  return (
    <div
      className={`flex items-center justify-between self-stretch ${className}`}
      role="group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar src={profileImageUrl} size={32} />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sub-title-xlarge text-primary font-semibold Pretendard truncate">{nickname}</p>
            <Badge
              variant="primary"
              size="sm"
              icon={`badge_${String(level).toLowerCase()}`}
            />
          </div>

        
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rightNode}
      </div>
    </div>
  );
};

// 최적화: React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
export default memo(CardHeader);
