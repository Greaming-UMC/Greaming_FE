import { ActionItem, EmptyState } from "../../../../components/common";
import type { CircleMemberItem } from "../../types";

interface CircleMemberListSectionProps {
  members: CircleMemberItem[];
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
        // 🟢 서브타이틀 우선순위: 소개글(introduction) -> 태그(tags) -> 빈 문자열
        const subtitleText = member.introduction 
          ? member.introduction 
          : member.tags?.map(tag => `#${tag}`).join(' ');

        return (
          <ActionItem
            key={member.userId}
            size="lg"
            action={member.isFollowing ? "following" : "follow"}
            title={member.nickname}
            subtitle={subtitleText}
            badge={{
              // 🟢 명세의 level(UsagePurpose)에 따른 배지 아이콘 매칭
              icon: member.level === 'MASTER' ? 'badgeMaster' : 'badgeArtist', 
              size: "md"
            }}
            avatar={{ 
              src: member.profileImgUrl, 
              icon: member.profileIcon || "person" 
            }}
            onFollow={() => onToggleFollow(member.userId)}
            onUnfollow={() => onToggleFollow(member.userId)}
            widthMode="fill"
          />
        );
      })}

      {/* 🟢 바닥 감지 및 로딩 UI (Intersection Observer의 타겟) */}
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