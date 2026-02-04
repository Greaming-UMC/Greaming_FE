import { ActionItem, EmptyState, Button } from "../../../../components/common";
import type { CircleItem } from "../../types";
import clsx from "clsx";

interface CircleSearchSectionProps {
  circles: CircleItem[];
  onToggle: (circleId: number) => void;
}

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
            // 🟢 variant: "text"를 사용하여 커스텀 포맷팅된 문자열 전달
            subtitle={{
              variant: "text",
              value: membersText
            }}
            subtitleClassName={isFullNotJoined ? "text-status-error" : ""}
            avatar={{ src: circle.profileUrl, icon: "char_default" }}
            action={isFullNotJoined ? "none" : (circle.isJoined ? "joined" : "join")}
            
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
                >
                  정원 초과
                </Button>
              ) : undefined
            }
            onJoin={() => onToggle(circle.circleId)}
            onLeave={undefined} 
            widthMode="fill"
          />
        );
      })}
    </div>
  );
};

export default CircleSearchSection;