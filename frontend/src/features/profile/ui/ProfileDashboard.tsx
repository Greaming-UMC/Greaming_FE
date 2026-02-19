import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/common/feedback";
import { ActionItem } from "../../../components/common/input";
import type { IconName } from "../../../components/common/Icon";
import type { FollowState } from "../../../apis/types/common";

import DropdownButton from "../components/DropDownButton";
import ProfileSelf from "./section/ProfileSelf";
import ProfileOther from "./section/ProfileOther";
import ProfileCircle from "./section/ProfileCircle";

import { useMyProfile, useUserProfile } from "../hooks";
import { PROFILE_VIEW_CONFIG, type ProfileViewContext } from "../config/profileRoleConfig";
import { toKoreanTagLabel } from "../utils/tagLabel";

interface ProfileViewProps {
    context: ProfileViewContext;
    userId?: number;
    circleId?: number;
}

type FollowModalType = "followers" | "followings" | null;

type FollowListItem = {
  userId: number;
  nickname: string;
  profileImgUrl?: string | null;
  level?: IconName;
  specialtyTags: string[];
  interestTags: string[];
  isPrivate?: boolean;
  followState?: FollowState | null;
};

const JOURNEY_LEVEL_ICONS = ["SKETCHER", "PAINTER", "ARTIST", "MASTER"] as const;
type JourneyLevelIcon = (typeof JOURNEY_LEVEL_ICONS)[number];

const resolveJourneyIcon = (value: unknown): IconName | undefined => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toUpperCase();
  if ((JOURNEY_LEVEL_ICONS as readonly string[]).includes(normalized)) {
    return normalized as JourneyLevelIcon;
  }
  return undefined;
};

const ProfileDashboard = ( { context, userId, circleId }: ProfileViewProps) => {

    const ui = context.type === "user"
      ? PROFILE_VIEW_CONFIG.user[context.role]
      : PROFILE_VIEW_CONFIG.circle[context.role];
    const navigator = useNavigate();
    const [followModalType, setFollowModalType] = useState<FollowModalType>(null);
    const [followItems, setFollowItems] = useState<FollowListItem[]>([]);
    const isSelfUser = context.type === "user" && context.role === "self";
    const isOtherUser = context.type === "user" && context.role === "other";

    const myProfileQuery = useMyProfile({ enabled: isSelfUser });
    const userProfileQuery = useUserProfile(isOtherUser ? userId : undefined);

    const profileInfo = useMemo(() => {
      if (isSelfUser) {
        const data = myProfileQuery.data?.result;
        return data?.user_information ?? data?.userInformation;
      }
      if (isOtherUser) {
        const data = userProfileQuery.data?.result;
        return data?.user_information ?? data?.userInformation;
      }
      return undefined;
    }, [isOtherUser, isSelfUser, myProfileQuery.data, userProfileQuery.data]);

    const buildMockFollowItems = (): FollowListItem[] => {
      const nickname = profileInfo?.nickname ?? "그리머";
      const profileImgUrl = profileInfo?.profileImgUrl ?? "";
      const specialtyTags = (profileInfo?.specialtyTags ?? []).slice(0, 2);
      const interestTags = (profileInfo?.interestTags ?? []).slice(0, 2);
      const level = resolveJourneyIcon(profileInfo?.journeyLevel ?? profileInfo?.level);

      return [
        {
          userId: 1001,
          nickname,
          profileImgUrl,
          level,
          specialtyTags,
          interestTags,
          isPrivate: true,
          followState: "REQUESTED",
        },
        {
          userId: 1002,
          nickname: "그리머2026",
          profileImgUrl: "",
          level: "PAINTER",
          specialtyTags: ["ILLUSTRATION", "CHARACTER"],
          interestTags: ["FAN_ART", "ANIMATION"],
          isPrivate: false,
          followState: null,
        },
        {
          userId: 1003,
          nickname: "캔버스러버",
          profileImgUrl: "",
          level: "ARTIST",
          specialtyTags: ["LANDSCAPE", "WATERCOLOR"],
          interestTags: ["PORTRAIT", "PENCIL"],
          isPrivate: false,
          followState: "COMPLETED",
        },
      ];
    };

    const openFollowModal = (type: Exclude<FollowModalType, null>) => {
      setFollowModalType(type);
      setFollowItems(buildMockFollowItems());
    };

    const closeFollowModal = () => setFollowModalType(null);

    const handleToggleFollow = (targetUserId: number) => {
      setFollowItems((prev) =>
        prev.map((item) =>
          item.userId === targetUserId
            ? {
                ...item,
                followState:
                  item.followState === "COMPLETED"
                    ? null
                    : item.isPrivate
                    ? "REQUESTED"
                    : "COMPLETED",
              }
            : item,
        ),
      );
    };

    const modalTitle = followModalType === "followers" ? "팔로워" : "팔로잉";

    return (
        <>
          <div className="relative w-[400px] h-fit flex flex-col gap-[32px] bg-surface rounded-large shadow-xl px-[24px] py-[64px]">

              {/* Button */}
              {ui.showEditButton && (
                <div className="absolute right-[24px] top-[16px]">
                  <DropdownButton onEdit={() => navigator("/setting/Profile")} />
                </div>
              )}

              {/* Profile */}
              {context.type === "user" ? (
                context.role === "self" ? (
                  <ProfileSelf
                    onFollowerClick={() => openFollowModal("followers")}
                    onFollowingClick={() => openFollowModal("followings")}
                  />
                ) : (
                  <ProfileOther
                    userId={userId}
                    onFollowerClick={() => openFollowModal("followers")}
                    onFollowingClick={() => openFollowModal("followings")}
                  />
                )
              ) : (
                <ProfileCircle circleId={circleId} />
              )}

          </div>

          <Modal open={followModalType !== null} onClose={closeFollowModal} variant="default">
            <Modal.Header title={modalTitle} />
            <Modal.Body>
              <div className="flex w-full flex-col">
                {followItems.map((item) => {
                  const specialty = item.specialtyTags
                    .map((tag) => `#${toKoreanTagLabel(tag)}`)
                    .join(" ");
                  const interest = item.interestTags
                    .map((tag) => `#${toKoreanTagLabel(tag)}`)
                    .join(" ");

                  const action =
                    item.followState === "REQUESTED"
                      ? "requested"
                      : item.followState === "COMPLETED"
                      ? "following"
                      : "follow";

                  return (
                    <ActionItem
                      key={item.userId}
                      variant="modal"
                      action={action}
                      size="xl"
                      radius="none"
                      align="left"
                      widthMode="fill"
                      avatar={{
                        src: item.profileImgUrl,
                        alt: item.nickname,
                        icon: "char_default",
                      }}
                      badge={
                        item.level
                          ? { icon: item.level, size: "md", className: "text-on-surface" }
                          : undefined
                      }
                      title={item.nickname}
                      titleClassName="main-title-small-emphasized text-on-surface"
                      subtitle={{
                        variant: "text",
                        value: `특기 ${specialty || "-"} · 취향 ${interest || "-"}`,
                      }}
                      subtitleClassName="label-large text-on-surface-variant-lowest"
                      onFollow={() => handleToggleFollow(item.userId)}
                      onUnfollow={() => handleToggleFollow(item.userId)}
                    />
                  );
                })}
              </div>
            </Modal.Body>
          </Modal>
        </>
    )

}; export default ProfileDashboard;
