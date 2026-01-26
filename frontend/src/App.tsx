import { List } from "./components/common/input";

const badgeArtist = {
  size: "sm",
  icon: "badge_artist",
} as const;

const avatarGreen = {
  icon: "char_profile_green",
  alt: "avatar",
} as const;

function App() {
  return (
    <div className="min-h-screen bg-surface-variant-lowest text-on-surface p-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <List
          variant="notification"
          size="lg"
          radius="md"
          title="닉네임"
          badge={badgeArtist}
          subtitle="#특기태그 #특기태그 #특기태그"
          avatar={avatarGreen}
          action="follow"
          onFollow={() => {}}
          widthMode="fill"
        />
        <List
          variant="notification"
          size="lg"
          radius="md"
          title="닉네임"
          badge={badgeArtist}
          subtitle="#특기태그 #특기태그 #특기태그"
          avatar={avatarGreen}
          action="following"
          onUnfollow={() => {}}
          widthMode="fill"
        />
        <List
          variant="notification"
          size="lg"
          radius="md"
          title="닉네임"
          badge={badgeArtist}
          subtitle="#특기태그 #특기태그 #특기태그"
          avatar={avatarGreen}
          action="kick"
          onKick={() => {}}
          widthMode="fill"
        />
        <List
          variant="modal"
          size="lg"
          radius="md"
          title="써클 이름"
          subtitle="인원 | 제한없음"
          avatar={avatarGreen}
          action="follow"
          onFollow={() => {}}
          widthMode="fill"
        />
        <List
          variant="modal"
          size="lg"
          radius="md"
          title="써클 이름"
          subtitle="인원 | 제한없음"
          avatar={avatarGreen}
          action="following"
          onUnfollow={() => {}}
          widthMode="fill"
        />
        <List
          variant="modal"
          size="lg"
          radius="md"
          title="닉네임"
          badge={badgeArtist}
          subtitle="#특기태그 #특기태그 #특기태그"
          avatar={avatarGreen}
          action="acceptReject"
          onAccept={() => {}}
          onReject={() => {}}
          widthMode="fill"
        />
      </div>
    </div>
  );
}

export default App;
