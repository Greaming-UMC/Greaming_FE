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
      <EmptyState
        icon="char_profile_blue"
        title="팔로잉 중인 유저가 없어요"
      />
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
            icon: "person" 
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