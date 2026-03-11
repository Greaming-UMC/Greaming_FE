import type { FollowUserInfo } from "../../../../apis/types/common";
import { ActionItem, EmptyState } from "../../../../components/common";

interface FollowerListSectionProps {
  users: FollowUserInfo[];
  onToggle: (userId: number) => void;
}

const FollowerListSection = ({ users, onToggle }: FollowerListSectionProps) => {
  // 1. 데이터가 없을 경우 처리
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

  // 2. 리스트 렌더링
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ActionItem
          key={user.userId}
          size="lg"
          // 🟢 내가 상대방을 팔로우 중인지 여부에 따라 버튼 표시
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          // 🟢 디자인 시안대로 특기 태그 표시 (# 태그 형식)
          subtitle={
            (user as any).specialtyTags && (user as any).specialtyTags.length > 0 
              ? (user as any).specialtyTags.map((tag: string) => `# ${tag}`).join(' ')
              : "# 태그없음"
          }
          badge={{
            // 🟢 journeyLevel에 따른 동적 뱃지 아이콘 매핑
            icon: user.journeyLevel === 'SKETCHER' ? 'SKETCHER' : 
                  user.journeyLevel === 'PAINTER' ? 'PAINTER' :
                  user.journeyLevel === 'ARTIST' ? 'ARTIST' : 'MASTER',
            size: "md"
          }}
          avatar={{ 
            src: user.profileImgUrl || '', // 🟢 null 대응
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