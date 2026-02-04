import { ActionItem, EmptyState } from "../../../../components/common";
import type { IconName } from "../../../../components/common/Icon";
import type { SocialUserItem } from "../../types"; // 확장된 타입 사용

interface FollowingListSectionProps {
  users: SocialUserItem[]; // SocialUser -> SocialUserItem으로 변경
  onToggle: (userId: number) => void; // id -> userId로 변경
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
          key={user.userId}
          size="lg"
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          subtitle={user.bio || "소개글이 없습니다."}
          badge={{
            icon: user.badgeImage as IconName || 'badge_artist', 
            size: "md"
          }}
          avatar={{ 
            src: user.profileImgUrl,
            icon: (user.profileIcon as IconName) || "avatar_grey"
          }}
          // 토글 함수 하나로 관리
          onUnfollow={() => onToggle(user.userId)}
          onFollow={() => onToggle(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default FollowingListSection;