import type { CheckCircleMemberInfo } from "../../../../apis/types/common";
import { ActionItem } from "../../../../components/common";


interface KickSectionProps {
  users: CheckCircleMemberInfo[]; 
  onKick: (userId: number) => void;
}

const KickSection = ({ users, onKick }: KickSectionProps) => {
  return (
    <div className="flex flex-col">
      {users.map((user) => {
        // 🟢 명세 기반 서브타이틀: 태그가 있으면 #태그 형태로 표시
        const subtitleText = user.tags && user.tags.length > 0
          ? user.tags.map(t => `#${t}`).join(' ')
          : "";

        return (
          <ActionItem
            key={user.userId} 
            size="lg"
            action="kick"
            title={user.nickname}
            subtitle={subtitleText}
            avatar={{ 
              src: user.profileImgUrl, 
              // 명세 외 필드이므로 기본 person 아이콘 사용
              icon: "person" 
            }}
            badge={{ 
              // UsagePurpose(level)에 따른 배지 매칭
              icon: user.level === 'MASTER' ? 'badgeMaster' : 'badgeArtist', 
              size: "md" 
            }}
            onKick={() => onKick(user.userId)}
            widthMode="fill"
          />
        );
      })}
    </div>
  );
};

export default KickSection;