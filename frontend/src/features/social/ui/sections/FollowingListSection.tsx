import { ActionItem, EmptyState } from "../../../../components/common";
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
          key={user.userId} // id -> userId 사용
          size="lg"
          // 현재 팔로우 상태에 따라 ActionItem의 버튼 UI 결정
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          subtitle={user.bio}
          badge={{
            // badgeImage가 있으면 사용하고, 없으면 기본값 설정
            icon: user.badgeImage || 'badge_artist', 
            size: "md"
          }}
          avatar={{ 
            src: user.profileImgUrl, // profileImageUrl -> profileImgUrl
            icon: user.profileIcon || "avatar_grey" // person -> avatar_grey 등 프로젝트 기본값
          }}
          // 버튼 클릭 시 상위 모달의 토글 로직 호출
          onUnfollow={() => onToggle(user.userId)}
          onFollow={() => onToggle(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default FollowingListSection;