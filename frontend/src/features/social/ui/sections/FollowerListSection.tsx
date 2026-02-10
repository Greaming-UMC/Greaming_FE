import type { FollowUserInfo } from "../../../../apis/types/common";
import { ActionItem, EmptyState } from "../../../../components/common";


interface FollowerListSectionProps {
  // 🟢 SocialUserItem 대신 FollowUserInfo 사용
  users: FollowUserInfo[];
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
          // isFollowing 상태에 따라 'following' 또는 'follow' 액션 결정
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          // 🟢 원본 명세에 bio가 없을 수 있으므로 방어 코드 작성 (필요 시 공통 타입에 bio 추가 검토)
          subtitle={(user as any).bio || ""} 
          badge={{
            // 🟢 명세에 레벨이나 배지가 없다면 기본 배지 노출
            icon: (user as any).badgeImage || 'badgeArtist',          
            size: "md"
          }}
          avatar={{ 
            src: user.profileImgUrl, 
            // 🟢 명세 외 필드이므로 기본 person 아이콘 사용
            icon: "person" 
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