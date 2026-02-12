import { Avatar, Chip, Counter, Divider } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import type { IconName } from "../../../../components/common/Icon";
import SpeechBubble from "../../../../components/common/SpeechBubble";
import SocialButton from "../../components/SocialButton";
import { useUserProfile } from "../../hooks";
import type { CheckUserProfileResult } from "../../../../apis/types/user";

const MOCK_PROFILE_RESULT: CheckUserProfileResult = {
  user_information: {
    nickname: "닉네임",
    profileImgUrl: "",
    usagePurpose: "PAINTER",    
    intro: "소개글 내용",          
    weeklyGoalScore: 0,       
    followerCount: 10,
    followingCount: 10,
    specialties: {             
      fields: ["ILLUSTRATION", "DAILY"],
      style: "디지털"
    },
    interests: {               
      fields: ["ILLUSTRATION", "ARCHITECTURE","FAN_ART"],
      style: "컬러"
    },
    followState: "COMPLETED"
  },
  challenge_calender: {
    dailyChallenge: [],
    weeklyChallenge: [],
  },
};

type ProfileOtherProps = {
  userId?: number;
};

const ProfileOther = ({ userId }: ProfileOtherProps) => {
  const query = useUserProfile(userId);
  const result = query.data?.result ?? MOCK_PROFILE_RESULT;
  const fallbackInfo = MOCK_PROFILE_RESULT.user_information!;
  const info =
    result.user_information ??
    result.userInformation ??
    fallbackInfo;
  const specialtyTags = info.specialtyTags ?? [];
  const interestTags = info.interestTags ?? [];
  const usageIcon = info.level as IconName;
  const targetId = userId ?? 0;
  const followState = info.followState;

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
          <Counter variant="label" size="sm" count={info.followerCount} label="팔로워" />
          <Divider orientation="vertical" thickness={1} style={{ height: 16 }} />
          <Counter variant="label" size="sm" count={info.followingCount} label="팔로잉" />
        </div>
        
        <SocialButton
          targetId={targetId}
          followState={followState}
          className="mt-[16px]"
        />
      </div>   

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

      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 소개글 </div>

      <div className="mt-[8px] label-xlarge text-on-surface"> {info.intro} </div>

      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 활동 정보 </div>
      <div className="mt-[8px] flex flex-col gap-[8px]">
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_green" size={"24px"} />
          <SpeechBubble label="총 N개의 그림을 업로드했어요" />
        </div>
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_red" size={"24px"} />
          <SpeechBubble label="N개의 그림을 연속으로 업로드했어요" />
        </div>
      </div>
    </section>
  );
};

export default ProfileOther;