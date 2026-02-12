import { Avatar, Chip, Counter, Divider } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import type { IconName } from "../../../../components/common/Icon";
import SpeechBubble from "../../../../components/common/SpeechBubble";

import { useMyProfile, useProfileHistory } from "../../hooks";

import type { CheckMyProfileResult } from "../../../../apis/types/user";

const MOCK_PROFILE_RESULT: CheckMyProfileResult = {
  user_information: {
    userId: 0,
    nickname: "닉네임",
    profileImgUrl: "",
    usagePurpose: "SKETCHER",   
    intro: "소개글 내용",       
    weeklyGoalScore: 0,         
    followerCount: 10,
    followingCount: 10,
    specialties: {              
      fields: ["ILLUSTRATION", "DAILY"],
      style: "디지털"
    },
    interests: {               
      fields: ["ARCHITECTURE", "FAN_ART"],
      style: "컬러"
    },
  },
  challenge_calender: {
    dailyChallenge: [],
    weeklyChallenge: [],
  },
};

const ProfileSelf = () => {
  const query = useMyProfile();
  const { uploadCount, maxConsecutiveChallengeDays } = useProfileHistory({
    mode: "self",
  });

  const result = query.data?.result ?? MOCK_PROFILE_RESULT;
  const fallbackInfo = MOCK_PROFILE_RESULT.user_information!;
  const info =
    result.user_information ??
    result.userInformation ??
    fallbackInfo;
  const specialtyFields = info.specialties?.fields ?? [];
  const interestFields = info.interests?.fields ?? [];
  const usageIcon = info.usagePurpose as IconName;

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
          <Counter variant="label" size="sm" count={info.followerCount} label="팔로워" />
          <Divider orientation="vertical" thickness={1} style={{ height: 16 }} />
          <Counter variant="label" size="sm" count={info.followingCount} label="팔로잉" />
        </div>
        
      </div>

      {/* Hashtag */}
      <div className="mt-[48px] label-xlarge-emphasized text-on-surface">특기·취향</div>
      <div className="mt-[8px] flex flex-col gap-[8px] p-[12px] bg-on-surface-variant-highest rounded-small label-xlarge">

        <div className="flex items-start gap-[16px]"> 내 특기
            <div className="flex flex-wrap gap-[8px]">
              {specialtyFields.map((tag) => (
                <Chip key={tag} label={`#${tag}`} />
              ))}
            </div>
        </div>
        <div className="flex items-start gap-[16px]"> 내 취향
            <div className="flex flex-wrap gap-[8px]">
              {interestFields.map((tag) => (
                <Chip key={tag} label={`#${tag}`} />
              ))}
            </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 소개글 </div>
      {/* introduction -> intro 로 수정 */}
      <div className="mt-[8px] label-xlarge text-on-surface"> {info.intro} </div>

      {/* History */}
      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 활동 정보 </div>
      <div className="mt-[8px] flex flex-col gap-[8px]">
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_green" size={"24px"} />
          <SpeechBubble label={`총 ${uploadCount}개의 그림을 업로드했어요`} />
        </div>
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_red" size={"24px"} />
          <SpeechBubble label={`${maxConsecutiveChallengeDays}일 연속으로 챌린지를 수행했어요`} />
        </div>
      </div>
    </section>
  );
};

export default ProfileSelf;
