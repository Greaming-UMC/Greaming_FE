import type { FollowUserInfo } from "../../../../apis/types/common";
import { ActionItem } from "../../../../components/common";


interface InviteSectionProps {
  // 🟢 SocialUserItem 대신 FollowUserInfo 배열 사용
  users: FollowUserInfo[]; 
  onInvite: (userId: number) => void;
}

const InviteSection = ({ users, onInvite }: InviteSectionProps) => {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          key={user.userId}
          size="lg"
          action="invite"
          title={user.nickname}
          // 🟢 명세에 bio가 없을 수 있으므로 안전하게 처리
          subtitle={(user as any).bio || "함께 써클을 즐겨보세요"} 
          avatar={{ 
            src: user.profileImgUrl, 
            icon: "person" 
          }}
          badge={{ 
            // 🟢 명세 기반 배지 매칭 (데이터가 없을 경우 기본값)
            icon: (user as any).badgeImage || 'badgeArtist', 
            size: "md" 
          }}
          onInvite={() => onInvite(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default InviteSection;