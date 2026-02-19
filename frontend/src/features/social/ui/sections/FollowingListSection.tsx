import type { FollowUserInfo } from "../../../../apis/types/common";
import { ActionItem, EmptyState } from "../../../../components/common";

interface FollowingListSectionProps {
  users: FollowUserInfo[];
  onToggle: (userId: number) => void;
}

const FollowingListSection = ({ users, onToggle }: FollowingListSectionProps) => {
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <EmptyState
          icon="char_sad"
          description="목록이 비어있어요"
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
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          // 🟢 subtitle 대신 특기 태그 표시 (# 태그1 # 태그2 형식)
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
            src: user.profileImgUrl || '', 
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

export default FollowingListSection;