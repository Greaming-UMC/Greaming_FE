import { ActionItem } from "../../../../components/common";
import type { CircleMember } from "../../types";

const KickSection = ({ users, onKick }: { users: CircleMember[], onKick: (id: number) => void }) => {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          key={user.id}
          size="lg"
          action="kick" // 🟢 버튼 라벨: "내보내기"
          title={user.nickname}
          subtitle={user.bio}
          avatar={{ src: user.profileImageUrl, icon: "person" }}
          badge={{ icon: user.badgeImage, size: "md" }}
          onKick={() => onKick(user.id)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default KickSection;