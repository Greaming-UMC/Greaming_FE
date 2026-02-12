import type { FollowUserInfo } from "../../../../apis/types/common";
import { ActionItem, EmptyState } from "../../../../components/common";


interface FollowingListSectionProps {
  // 🟢 FollowUserInfo 배열로 타입 교체
  users: FollowUserInfo[];
  onToggle: (userId: number) => void;
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
          key={user.userId}
          size="lg"
          // 팔로잉 목록이므로 기본적으로 true겠지만, 언팔로우 시 상태 반영을 위해 체크
          action={user.isFollowing ? "following" : "follow"}
          title={user.nickname}
          // 🟢 명세에 bio가 없을 수 있으므로 (user as any) 처리 혹은 빈 값
          subtitle={(user as any).bio || "소개글이 없습니다."}
          badge={{
            // 🟢 명세에 뱃지 관련 필드가 추가될 때까지 기본값 유지
            icon: (user as any).badgeImage || 'badgeArtist', 
            size: "md"
          }}
          avatar={{ 
            src: user.profileImgUrl,
            // 🟢 profileIcon 대신 기본 person 아이콘 사용 (명세 준수)
            icon: "person"
          }}
          // 토글 함수 하나로 관리
          onUnfollow={() => onToggle(user.userId)}
          onFollow={() => onToggle(user.userId)}
          widthMode="fill"
        />
      ))}
    </div>
  );
};

export default FollowingListSection;