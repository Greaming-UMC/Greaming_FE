import { useState } from "react";
import { ActionItem, ListBase, SelectItem } from "./components/common/input";

const badgeArtist = {
  size: "sm",
  icon: "badge_artist",
} as const;

const avatarGreen = {
  icon: "char_profile_green",
  alt: "avatar",
} as const;

function App() {
  const [selectedId, setSelectedId] = useState<"direct" | "none">("direct");
  const [selectedIds, setSelectedIds] = useState<string[]>(["direct"]);

  const toggleMulti = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-surface-variant-lowest text-on-surface p-10">
      <div className="mx-auto max-w-5xl space-y-16">
        <section className="grid gap-12 md:grid-cols-2">
          <div className="space-y-3">
            <p className="label-large text-on-surface-variant">
              써클 추가하기
            </p>
            <ListBase
              variant="modal"
              size="md"
              radius="lg"
              leadingIcon="add"
              title="추가하기"
              widthMode="fill"
            />
          </div>
          <div className="space-y-3">
            <p className="label-large text-on-surface-variant">
              써클 추가하기
            </p>
            <div className="space-y-2">
              <ListBase
                variant="modal"
                size="md"
                radius="lg"
                leadingIcon="nav_circle"
                title="Circle Name"
                widthMode="fill"
              />
              <ListBase
                variant="modal"
                size="md"
                radius="lg"
                leadingIcon="add"
                title="추가하기"
                widthMode="fill"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-12 md:grid-cols-2">
          <div className="space-y-3">
            <p className="label-large text-on-surface-variant">
              프로필 + 뱃지
            </p>
            <ListBase
              variant="notification"
              size="lg"
              radius="lg"
              title="닉네임"
              subtitle={{ variant: "hashtags", tags: ["특기태그", "특기태그"] }}
              avatar={avatarGreen}
              badge={badgeArtist}
              widthMode="fill"
            />
            <ListBase
              variant="notification"
              size="lg"
              radius="lg"
              title="써클 이름"
              subtitle={{ variant: "count", current: 12, max: 30 }}
              avatar={avatarGreen}
              widthMode="fill"
            />
          </div>
          <div className="space-y-3">
            <p className="label-large text-on-surface-variant">액션 아이템</p>
            <ActionItem
              variant="notification"
              size="lg"
              radius="lg"
              title="닉네임"
              subtitle={{ variant: "hashtags", tags: ["특기태그", "특기태그"] }}
              avatar={avatarGreen}
              badge={badgeArtist}
              action="follow"
              onFollow={() => {}}
              widthMode="fill"
            />
            <ActionItem
              variant="notification"
              size="md"
              radius="lg"
              title="닉네임"
              subtitle={{ variant: "hashtags", tags: ["특기태그", "특기태그"] }}
              avatar={avatarGreen}
              badge={badgeArtist}
              action="following"
              onUnfollow={() => {}}
              widthMode="fill"
            />
            <ActionItem
              variant="notification"
              size="md"
              radius="lg"
              title="닉네임"
              subtitle={{ variant: "hashtags", tags: ["특기태그", "특기태그"] }}
              avatar={avatarGreen}
              badge={badgeArtist}
              action="acceptReject"
              onAccept={() => {}}
              onReject={() => {}}
              widthMode="fill"
            />
          </div>
        </section>

        <section className="grid gap-12 md:grid-cols-2">
          <div className="space-y-3">
            <p className="label-large text-on-surface-variant">수정하기</p>
            <ListBase
              variant="modal"
              size="md"
              radius="lg"
              leadingIcon="edit"
              title="수정하기"
              widthMode="fill"
            />
          </div>
          <div className="space-y-3">
            <p className="label-large text-on-surface-variant">
              수정/삭제하기
            </p>
            <div className="space-y-2">
              <ListBase
                variant="modal"
                size="md"
                radius="lg"
                leadingIcon="edit"
                title="수정하기"
                widthMode="fill"
              />
              <ListBase
                variant="modal"
                size="md"
                radius="lg"
                leadingIcon="delete"
                title="삭제하기"
                widthMode="fill"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="label-large text-on-surface-variant">
              인원수 설정 (중복 허용)
            </p>
            <SelectItem
              variant="modal"
              size="md"
              radius="lg"
              selectionStyle="check"
              selected={selectedIds.includes("direct")}
              onClick={() => toggleMulti("direct")}
              title="직접입력"
              widthMode="fill"
            />
            <SelectItem
              variant="modal"
              size="md"
              radius="lg"
              selectionStyle="check"
              selected={selectedIds.includes("none")}
              onClick={() => toggleMulti("none")}
              title="제한없음"
              widthMode="fill"
            />
            <SelectItem
              variant="modal"
              size="md"
              radius="lg"
              selectionStyle="check"
              selected={selectedIds.includes("custom")}
              onClick={() => toggleMulti("custom")}
              title="직접입력 + 기타"
              widthMode="fill"
            />
          </div>

          <div className="space-y-2">
            <p className="label-large text-on-surface-variant">
              인원수 설정 (하나만 선택)
            </p>
            <SelectItem
              variant="modal"
              size="md"
              radius="lg"
              selectionStyle="solid"
              selected={selectedId === "direct"}
              onClick={() => setSelectedId("direct")}
              title="직접입력"
              widthMode="fill"
            />
            <SelectItem
              variant="modal"
              size="md"
              radius="lg"
              selectionStyle="solid"
              selected={selectedId === "none"}
              onClick={() => setSelectedId("none")}
              title="제한없음"
              widthMode="fill"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
