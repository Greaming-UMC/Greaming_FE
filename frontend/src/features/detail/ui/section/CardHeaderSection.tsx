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

// 최적화: React.memo를 사용하되, 커스텀 비교 함수 제거
// rightNode의 변경 (isMenuOpen 변경 포함)을 정확히 추적하도록 기본 비교 사용
export default memo(CardHeader);
