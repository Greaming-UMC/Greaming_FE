import { Avatar, Chip, Counter, Divider } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import type { IconName } from "../../../../components/common/Icon";
import SpeechBubble from "../../../../components/common/SpeechBubble";

import { useMyProfile, useProfileHistory } from "../../hooks";
import { toKoreanTagLabel } from "../../utils/tagLabel";

import type { CheckMyProfileResult } from "../../../../apis/types/user";

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

const MOCK_PROFILE_RESULT: CheckMyProfileResult = {
  user_information: {
    userId: 0,
    nickname: "닉네임",
    profileImgUrl: "",
    journeyLevel: "SKETCHER",
    introduction: "소개글 내용",
    followerCount: 10,
    followingCount: 10,
    specialtyTags: ["ILLUSTRATION", "DAILY"],
    interestTags:["ILLUSTRATION", "ARCHITECTURE","FAN_ART"],
  },
  challenge_calender: {
    dailyChallenge: [],
    weeklyChallenge: [],
  },
};

type ProfileSelfProps = {
  onFollowerClick?: () => void;
  onFollowingClick?: () => void;
};

const ProfileSelf = ({ onFollowerClick, onFollowingClick }: ProfileSelfProps) => {
  const query = useMyProfile();
  const history = useProfileHistory({ mode: "self" });

  const result = query.data?.result ?? MOCK_PROFILE_RESULT;
  const fallbackInfo = MOCK_PROFILE_RESULT.user_information!;
  const info =
    result.user_information ??
    result.userInformation ??
    fallbackInfo;
  const specialtyTags = info.specialtyTags ?? [];
  const interestTags = info.interestTags ?? [];
  const usageIcon = resolveJourneyIcon(info.journeyLevel ?? info.level);
  const uploadCountText = history.isLoading ? "..." : history.uploadCount.toLocaleString();
  const consecutiveDaysText = history.isLoading
    ? "..."
    : history.maxConsecutiveChallengeDays.toLocaleString();

  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-center">

        {/* Avatar */}
        <div className="relative">
          <Avatar src={info.profileImgUrl} size="xxxl" />
          <Icon name={usageIcon} size={"44px"} className="absolute right-0 bottom-0" />
        </div>
        
        {/* Nickname */}
        <div className="mt-[24px] main-title-medium-emphasized text-on-surface">
          {info.nickname}
        </div>

        {/* Counter */}
        <div className="mt-[8px] flex items-center gap-[16px]">
          <button
            type="button"
            onClick={onFollowerClick}
            className="rounded-small state-layer primary-container-opacity-8"
          >
            <Counter variant="label" size="sm" count={info.followerCount} label="팔로워" />
          </button>
          <Divider orientation="vertical" thickness={1} style={{ height: 16 }} />
          <button
            type="button"
            onClick={onFollowingClick}
            className="rounded-small state-layer primary-container-opacity-8"
          >
            <Counter variant="label" size="sm" count={info.followingCount} label="팔로잉" />
          </button>
        </div>
        
      </div>

      {/* Hashtag */}
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

      {/* Introduction */}
      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 소개글 </div>
      {/* introduction -> intro 로 수정 */}
      <div className="mt-[8px] label-xlarge text-on-surface"> {info.introduction} </div>

      {/* History */}
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

export default ProfileSelf;
