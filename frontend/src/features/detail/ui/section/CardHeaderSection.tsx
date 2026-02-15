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
// rightNode는 드롭다운 메뉴 상태 변경 시 재생성되지만, 실제 표시되는 내용은 같으므로
// nickname, profileImageUrl, level만 비교하도록 커스텀 비교 함수 사용
export default memo(CardHeader, (prevProps, nextProps) => {
  return (
    prevProps.nickname === nextProps.nickname &&
    prevProps.profileImageUrl === nextProps.profileImageUrl &&
    prevProps.level === nextProps.level
    // rightNode는 의도적으로 비교에서 제외 - 드롭다운 상태 변경으로 인한 리렌더 방지
  );
});
