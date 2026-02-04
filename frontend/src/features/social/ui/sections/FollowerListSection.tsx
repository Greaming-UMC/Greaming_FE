import { ActionItem, EmptyState } from "../../../../components/common";
import type { SocialUserItem } from "../../types";

interface FollowerListSectionProps {
  users: SocialUserItem[];
  onToggle: (userId: number) => void;
}

const FollowerListSection = ({ users, onToggle }: FollowerListSectionProps) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <EmptyState
          icon="char_sad"    
          description="팔로워가 없어요"
          className="[&_svg]:w-[100px] [&_svg]:h-[100px] [&_svg]:opacity-100"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          key={user.userId}
          size="lg"
          // isFollowing이 true면 '맞팔로우 중' 상태이므로 'following' UI 노출
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          subtitle={user.bio}
          badge={{
            icon: user.badgeImage || 'badge_artist',          
            size: "md"
          }}
          avatar={{ 
            src: user.profileImgUrl, 
            icon: user.profileIcon || "avatar_grey" 
          }}
          onUnfollow={() => onToggle(user.userId)}
          onFollow={() => onToggle(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default FollowerListSection;