import { Avatar, Chip, Counter, Divider } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import type { IconName } from "../../../../components/common/Icon";
import SpeechBubble from "../../../../components/common/SpeechBubble";
import SocialButton from "../../components/SocialButton";
import { useProfileHistory, useUserProfile } from "../../hooks";
import type { CheckUserProfileResult } from "../../../../apis/types/user";
import { toKoreanTagLabel } from "../../utils/tagLabel";

const JOURNEY_LEVEL_ICONS = ["SKETCHER", "PAINTER", "ARTIST", "MASTER"] as const;
type JourneyLevelIcon = (typeof JOURNEY_LEVEL_ICONS)[number];

const resolveJourneyIcon = (value: unknown): IconName => {
  if (typeof value === "string") {
    const normalized = value.trim().toUpperCase();
    if ((JOURNEY_LEVEL_ICONS as readonly string[]).includes(normalized)) {
      return normalized as JourneyLevelIcon;
    }
  }
  return "SKETCHER";
};

const MOCK_PROFILE_RESULT: CheckUserProfileResult = {
  user_information: {
    nickname: "닉네임",
    profileImgUrl: "",
    journeyLevel: "PAINTER",
    introduction: "소개글 내용",
    followerCount: 0,
    followingCount: 0,
    specialtyTags: ["ILLUSTRATION", "DAILY"],
    interestTags:["ILLUSTRATION", "ARCHITECTURE","FAN_ART"],
    followState: undefined,
  },
  challenge_calender: {
    dailyChallenge: [],
    weeklyChallenge: [],
  },
};

type ProfileOtherProps = {
  userId?: number;
  onFollowerClick?: () => void;
  onFollowingClick?: () => void;
};

const ProfileOther = ({
  userId,
  onFollowerClick,
  onFollowingClick,
}: ProfileOtherProps) => {
  const query = useUserProfile(userId);
  const history = useProfileHistory({ mode: "other", userId });
  const result = query.data?.result ?? MOCK_PROFILE_RESULT;
  const fallbackInfo = MOCK_PROFILE_RESULT.user_information!;
  const info =
    result.user_information ??
    result.userInformation ??
    fallbackInfo;
  const specialtyTags = info.specialtyTags ?? [];
  const interestTags = info.interestTags ?? [];
  const usageLevel =
    info.journeyLevel ??
    (info as { level?: string }).level;
  const usageIcon = resolveJourneyIcon(usageLevel);
  const targetId = userId ?? 0;
  const followerCount = (() => {
    if (typeof info.followerCount === "number") return info.followerCount;
    const alt = (info as { follower_count?: number }).follower_count;
    return typeof alt === "number" ? alt : 0;
  })();
  const followingCount = (() => {
    if (typeof info.followingCount === "number") return info.followingCount;
    const alt = (info as { following_count?: number }).following_count;
    return typeof alt === "number" ? alt : 0;
  })();
  const followState = (() => {
    const normalized = typeof info.followState === "string"
      ? info.followState.trim().toUpperCase()
      : undefined;

    if (normalized === "REQUESTED" || normalized === "COMPLETED") {
      return normalized as "REQUESTED" | "COMPLETED";
    }

    const isFollowing = (info as { isFollowing?: boolean }).isFollowing;
    if (typeof isFollowing === "boolean") {
      return isFollowing ? "COMPLETED" : null;
    }

    return null;
  })();
  const uploadCountText = history.isLoading ? "..." : history.uploadCount.toLocaleString();
  const consecutiveDaysText = history.isLoading
    ? "..."
    : history.maxConsecutiveChallengeDays.toLocaleString();

  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar src={info.profileImgUrl} size="xxxl" />
          <Icon name={usageIcon} size={"44px"} className="absolute right-0 bottom-0" />
        </div>
        
        <div className="mt-[24px] main-title-medium-emphasized text-on-surface">
          {info.nickname}
        </div>

        <div className="mt-[8px] flex items-center gap-[16px]">
          <button
            type="button"
            onClick={onFollowerClick}
            className="rounded-small state-layer primary-container-opacity-8"
          >
            <Counter variant="label" size="sm" count={followerCount} label="팔로워" />
          </button>
          <Divider orientation="vertical" thickness={1} style={{ height: 16 }} />
          <button
            type="button"
            onClick={onFollowingClick}
            className="rounded-small state-layer primary-container-opacity-8"
          >
            <Counter variant="label" size="sm" count={followingCount} label="팔로잉" />
          </button>
        </div>
        
        <SocialButton
          targetId={targetId}
          followState={followState}
          className="mt-[16px]"
        />
      </div>   

      <div className="mt-[48px] label-xlarge-emphasized text-on-surface">특기·취향</div>
      <div className="mt-[8px] flex flex-col gap-[8px] p-[12px] bg-on-surface-variant-highest rounded-small label-xlarge">
        <div className="flex items-start gap-[16px]">
          <span className="shrink-0 whitespace-nowrap">내 특기</span>
          <div className="flex flex-wrap gap-[8px]">
            {specialtyTags.map((tag, index) => (
              <Chip key={`${tag}-${index}`} label={`#${toKoreanTagLabel(tag)}`} />
            ))}
          </div>
        </div>
        <div className="flex items-start gap-[16px]">
          <span className="shrink-0 whitespace-nowrap">내 취향</span>
          <div className="flex flex-wrap gap-[8px]">
            {interestTags.map((tag, index) => (
              <Chip key={`${tag}-${index}`} label={`#${toKoreanTagLabel(tag)}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 소개글 </div>

      <div className="mt-[8px] label-xlarge text-on-surface"> {info.introduction} </div>

      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 활동 정보 </div>
      <div className="mt-[8px] flex flex-col gap-[8px]">
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_green" size={"24px"} />
          <SpeechBubble label={`총 ${uploadCountText}개의 그림을 업로드했어요`} />
        </div>
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_red" size={"24px"} />
          <SpeechBubble label={`${consecutiveDaysText}일 연속으로 미션을 수행했어요`} />
        </div>
      </div>
    </section>
  );
};

export default ProfileOther;
