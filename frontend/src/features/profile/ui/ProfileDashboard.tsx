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

import {
  useFollowers,
  useFollowRequest,
  useFollowings,
  useMyProfile,
  useUserProfile,
} from "../hooks";
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
    const [followStateOverrides, setFollowStateOverrides] = useState<
      Record<number, FollowState | null>
    >({});
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

    const profileUserId = (profileInfo as { userId?: number } | undefined)?.userId;
    const targetProfileUserId =
      isSelfUser
        ? typeof profileUserId === "number"
          ? profileUserId
          : undefined
        : isOtherUser
        ? userId
        : undefined;

    const followersQuery = useFollowers(
      followModalType === "followers" ? targetProfileUserId : undefined,
      { page: 1, size: 20 },
      { enabled: followModalType === "followers" },
    );

    const followingsQuery = useFollowings(
      followModalType === "followings" ? targetProfileUserId : undefined,
      { page: 1, size: 20 },
      { enabled: followModalType === "followings" },
    );
    const { mutate: requestFollow } = useFollowRequest();

    const openFollowModal = (type: Exclude<FollowModalType, null>) => {
      setFollowModalType(type);
      setFollowStateOverrides({});
    };

    const closeFollowModal = () => {
      setFollowModalType(null);
      setFollowStateOverrides({});
    };

    const followUsers =
      followModalType === "followers"
        ? followersQuery.data?.result?.users ?? []
        : followingsQuery.data?.result?.users ?? [];

    const followItems: FollowListItem[] = useMemo(
      () =>
        followUsers.map((user) => {
          const serverState: FollowState | null = user.isFollowing
            ? "COMPLETED"
            : null;
          const followState = followStateOverrides[user.userId] ?? serverState;
          return {
            userId: user.userId,
            nickname: user.nickname,
            profileImgUrl: user.profileImgUrl,
            level: resolveJourneyIcon(user.journeyLevel),
            specialtyTags: user.specialtyTags ?? [],
            interestTags: user.interestTags ?? [],
            followState,
          };
        }),
      [followStateOverrides, followUsers],
    );

    const isFollowListLoading =
      followModalType === "followers"
        ? followersQuery.isLoading
        : followingsQuery.isLoading;

    const followListError =
      followModalType === "followers"
        ? followersQuery.error
        : followingsQuery.error;

    const handleToggleFollow = (targetUserId: number) => {
      requestFollow(targetUserId, {
        onSuccess: (data) => {
          const nextState =
            typeof data.result?.isFollowing === "boolean"
              ? data.result.isFollowing
                ? "COMPLETED"
                : null
              : "COMPLETED";
          setFollowStateOverrides((prev) => ({
            ...prev,
            [targetUserId]: nextState,
          }));
        },
      });
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
              {isFollowListLoading ? (
                <div className="flex min-h-[180px] items-center justify-center label-large text-on-surface-variant-lowest">
                  목록을 불러오는 중...
                </div>
              ) : followListError ? (
                <div className="flex min-h-[180px] items-center justify-center label-large text-error">
                  팔로우 목록 조회에 실패했어요.
                </div>
              ) : (
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
                          src: item.profileImgUrl ?? "",
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
              )}
            </Modal.Body>
          </Modal>
        </>
    )

}; export default ProfileDashboard;
