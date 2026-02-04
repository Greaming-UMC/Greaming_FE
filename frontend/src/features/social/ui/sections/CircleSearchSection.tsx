import { ActionItem, EmptyState, Button } from "../../../../components/common";
import type { CircleItem } from "../../types";
import clsx from "clsx";

interface CircleSearchSectionProps {
  circles: CircleItem[];
  onToggle: (circleId: number) => void;
}

const testCardStyle = "shadow-[0_0_4px_0_rgba(18,19,21,0.25)] border-none";

const CircleSearchSection = ({ circles, onToggle }: CircleSearchSectionProps) => {
  if (circles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <EmptyState icon="char_sad" description="검색된 써클이 없어요"  className="[&_svg]:w-[100px] [&_svg]:h-[100px] [&_svg]:opacity-100" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {circles.map((circle) => {
        const isFullNotJoined = circle.isFull && !circle.isJoined;
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
            avatar={{ src: circle.profileUrl, icon: "char_default" }}
            
            // 🟢 가입됨(joined)과 정원초과(none) 상태일 때만 ActionItem 기본 기능을 사용
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
                undefined // ActionItem의 action="joined"가 처리함
              ) : (
                // 🟢 '가입하기' 버튼만 직접 렌더링하여 클릭 이벤트를 확실히 잡음
                <Button
                  size="xs"
                  variant="primary"
                  shape="round"
                  widthMode="hug"
                  textClassName="label-large-emphasized text-surface"
                  className={testCardStyle}
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 방지
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