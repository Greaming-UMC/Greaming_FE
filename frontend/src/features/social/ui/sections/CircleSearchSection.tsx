import { ActionItem, EmptyState } from "../../../../components/common";
import type { Circle } from "../../types";

interface CircleSearchSectionProps {
  circles: Circle[];
  onToggle: (id: number) => void;
}

const CircleSearchSection = ({ circles, onToggle }: CircleSearchSectionProps) => {
  if (circles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
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
        // 인원수 표시 텍스트 생성
        const maxText = circle.maxMembers === 'unlimited' ? '제한없음' : `${circle.maxMembers}명`;
        const membersInfo = `${circle.memberCount} / ${maxText}`;

        return (
          <ActionItem
            key={circle.id}
            size="lg"
            action="join" 
            title={circle.name}
            subtitle={membersInfo}
            avatar={{ 
              src: circle.circleImageUrl, 
              icon: circle.CircleIcon || "char_default" 
            }}
            onAccept={() => onToggle(circle.id)}
            widthMode="fill"
          />
        );
      })}
    </div>
  );
};

export default CircleSearchSection;