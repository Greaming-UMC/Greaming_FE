import type { ExploreCircleInfo } from "../../../../apis/types/common";
import { ActionItem, EmptyState, Button } from "../../../../components/common";
import clsx from "clsx";

interface CircleSearchSectionProps {
  circles: ExploreCircleInfo[]; // 🟢 타입 교체
  onToggle: (circleId: number) => void;
}

const testCardStyle = "shadow-[0_0_4px_0_rgba(18,19,21,0.25)] border-none";

const CircleSearchSection = ({ circles, onToggle }: CircleSearchSectionProps) => {
  if (circles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <EmptyState 
          icon="char_sad" 
          description="검색된 써클이 없어요"  
          className="[&_svg]:w-[100px] [&_svg]:h-[100px] [&_svg]:opacity-100" 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {circles.map((circle) => {
        // 🟢 명세 기반 변수: isJoined, isFull
        const isFullNotJoined = circle.isFull && !circle.isJoined;
        // 🟢 capacity 제한없음 기준 (1000명 이상일 때)
        const maxText = circle.capacity >= 1000 ? '제한없음' : `${circle.capacity}명`;
        const membersText = `${circle.memberCount}명 / ${maxText}`;

        return (
          <ActionItem
            key={circle.circleId}
            size="lg"
            title={circle.name}
            subtitle={{
              variant: "text",
              value: membersText
            }}
            subtitleClassName={isFullNotJoined ? "text-status-error" : ""}
            // 🟢 명세의 profileUrl 사용 및 기본 아이콘 설정
            avatar={{ src: circle.profileUrl, icon: "char_default" }}
            
            // 가입됨(joined)과 정원초과(none) 상태일 때만 ActionItem 기본 기능을 사용
            action={isFullNotJoined ? "none" : (circle.isJoined ? "joined" : "none")}
            
            className={clsx(
              circle.isJoined && "cursor-default pointer-events-none"
            )}
            
            trailing={
              isFullNotJoined ? (
                <Button
                  size="xs"
                  variant="surface"
                  shape="round"
                  widthMode="hug"
                  disabled
                  textClassName="label-large-emphasized text-gray-400"
                  className={testCardStyle}
                >
                  정원 마감
                </Button>
              ) : circle.isJoined ? (
                undefined // ActionItem의 action="joined"가 스타일을 처리
              ) : (
                <Button
                  size="xs"
                  variant="primary"
                  shape="round"
                  widthMode="hug"
                  textClassName="label-large-emphasized text-surface"
                  className={testCardStyle}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onToggle(circle.circleId);
                  }}
                >
                  가입하기
                </Button>
              )
            }
            widthMode="fill"
          />
        );
      })}
    </div>
  );
};

export default CircleSearchSection;