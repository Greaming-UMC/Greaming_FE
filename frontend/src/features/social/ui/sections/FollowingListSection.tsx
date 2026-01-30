import { ActionItem, EmptyState } from "../../../../components/common";
import type { SocialUser } from "../../types";

interface FollowingListSectionProps {
  users: SocialUser[];
  onToggle: (id: number) => void;
}

const FollowingListSection = ({ users, onToggle }: FollowingListSectionProps) => {
  // 1. 데이터가 없을 경우 EmptyState 반환
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <EmptyState
        icon="char_sad"
        description="팔로잉 하는 사람이 없어요"
        className="[&_svg]:w-[100px] [&_svg]:h-[100px] [&_svg]:opacity-100"
      />
      </div>
    );
  }

  // 2. 데이터가 있을 경우 리스트 렌더링
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          key={user.id}
          size="lg"
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          subtitle={user.bio}
          badge={{
            icon: user.badgeImage || 'badgeArtist',         
            size: "md"
          }}
          avatar={{ 
            src: user.profileImageUrl, 
            icon: user.profileIcon || "person" 
          }}
          onUnfollow={() => onToggle(user.id)}
          onFollow={() => onToggle(user.id)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default FollowingListSection;