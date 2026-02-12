import type { CheckCircleMemberInfo } from "../../../../apis/types/common";
import { ActionItem, EmptyState } from "../../../../components/common";


interface CircleMemberListSectionProps {
  // 🟢 타입 교체
  members: CheckCircleMemberInfo[];
  onToggleFollow: (id: number) => void;
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage?: boolean;
}

const CircleMemberListSection = ({ 
  members, 
  onToggleFollow, 
  loadMoreRef,
  isFetchingNextPage 
}: CircleMemberListSectionProps) => {
  
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <EmptyState 
          icon="char_sad" 
          description="써클 멤버가 없어요" 
          className="[&_svg]:w-[100px] [&_svg]:h-[100px] [&_svg]:opacity-100" 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {members.map((member) => {
        // 🟢 명세 기반 서브타이틀 로직: 
        // 태그가 존재하면 #태그 형태로 보여주고, 없으면 빈 값 처리
        const subtitleText = member.tags && member.tags.length > 0
          ? member.tags.map(tag => `#${tag}`).join(' ')
          : "";

        return (
          <ActionItem
            key={member.userId}
            size="lg"
            action={member.isFollowing ? "following" : "follow"}
            title={member.nickname}
            subtitle={subtitleText}
            badge={{
              // 🟢 UsagePurpose(level)에 따른 배지 매칭
              icon: member.level === 'MASTER' ? 'badgeMaster' : 'badgeArtist', 
              size: "md"
            }}
            avatar={{ 
              src: member.profileImgUrl, 
              // 🟢 명세에 profileIcon이 없으므로 기본 person 아이콘 사용
              icon: "person" 
            }}
            onFollow={() => onToggleFollow(member.userId)}
            onUnfollow={() => onToggleFollow(member.userId)}
            widthMode="fill"
          />
        );
      })}

      {/* 바닥 감지 및 로딩 UI */}
      <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center">
        {isFetchingNextPage && (
          <span className="text-label-small text-on-surface-variant-lowest animate-pulse">
            목록을 더 불러오는 중...
          </span>
        )}
      </div>
    </div>
  );
};

export default CircleMemberListSection;