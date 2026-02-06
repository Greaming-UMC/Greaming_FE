import { ActionItem } from "../../../../components/common";
import type { CircleMemberItem } from "../../types";

const KickSection = ({ users, onKick }: { users: CircleMemberItem[], onKick: (userId: number) => void }) => {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          // 🟢 key를 userId로 변경 (중복 방지)
          key={user.userId} 
          size="lg"
          action="kick"
          title={user.nickname}
          // 🟢 명세에 맞는 subtitle 우선순위 적용
          subtitle={user.introduction || user.tags?.map(t => `#${t}`).join(' ')}
          avatar={{ 
            src: user.profileImgUrl, 
            icon: user.profileIcon || "person" 
          }}
          badge={{ icon: user.badgeImage, size: "md" }}
          // 🟢 ActionItem 내부 버튼 핸들러에 id 전달
          onKick={() => onKick(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default KickSection;