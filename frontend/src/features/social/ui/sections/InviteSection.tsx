import { ActionItem } from "../../../../components/common";
import type { SocialUser } from "../../types";

const InviteSection = ({ users, onInvite }: { users: SocialUser[], onInvite: (id: number) => void }) => {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          key={user.id}
          size="lg"
          action="invite" // 🟢 버튼 라벨: "초대하기"
          title={user.nickname}
          subtitle={user.bio}
          avatar={{ src: user.profileImageUrl, icon: "person" }}
          badge={{ icon: user.badgeImage, size: "md" }}
          onInvite={() => onInvite(user.id)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default InviteSection;