import { ActionItem } from "../../../../components/common";
// 🟢 SocialUserItem 임포트 확인
import type { SocialUserItem } from "../../types";

// 🟢 props 타입을 SocialUserItem으로 변경
interface InviteSectionProps {
  users: SocialUserItem[]; 
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
          subtitle={user.bio} // SocialUserItem은 bio를 사용
          avatar={{ 
            src: user.profileImgUrl, 
            icon: "person" 
          }}
          badge={{ icon: user.badgeImage, size: "md" }}
          onInvite={() => onInvite(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default InviteSection;