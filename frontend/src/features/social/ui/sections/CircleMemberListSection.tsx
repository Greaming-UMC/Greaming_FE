import { ActionItem, EmptyState } from "../../../../components/common";
import type { CircleMember } from "../../types";

interface CircleMemberListSectionProps {
  members: CircleMember[];
  onToggleFollow: (id: number) => void;
}

const CircleMemberListSection = ({ members, onToggleFollow }: CircleMemberListSectionProps) => {
  // 1. 멤버 데이터가 없을 경우 (검색 결과가 없거나 멤버가 한 명도 없을 때)
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <EmptyState
          icon="char_sad"
          description="써클 멤버가 없어요"
          className="[&_svg]:w-[100px] [&_svg]:h-[100px] [&_svg]:opacity-100"
        />
      </div>
    );
  }

  // 2. 데이터가 있을 경우 리스트 렌더링
  return (
    <div className="flex flex-col">
      {members.map((member) => (
        <ActionItem
          key={member.id}
          size="lg"
          action={member.isFollowing ? "following" : "follow"}
          title={member.nickname}
          subtitle={member.bio} // #태그 #태그 형태
          badge={{
            icon: member.badgeImage || 'badgeArtist', 
            size: "md"
          }}
          avatar={{ 
            src: member.profileImageUrl, 
            icon: member.profileIcon || "person" 
          }}
          onFollow={() => onToggleFollow(member.id)}
          onUnfollow={() => onToggleFollow(member.id)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default CircleMemberListSection;