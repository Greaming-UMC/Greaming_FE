import { Avatar, Counter, Divider } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import SpeechBubble from "../../../../components/common/SpeechBubble";

import ApplyButton from "../../components/ApplyButton";


import { useCircleProfile } from "../../hooks";

import type { CheckCircleProfileResult } from "../../../../apis/types/circle";

const MOCK_PROFILE_RESULT: CheckCircleProfileResult = {
  circle_Information: {
    circle_name: "마왕의다슬기",
    profileImgUrl: "",
    leader_name: "마왕",
    introduction: "소개글 내용",
    member_count: 10,
    isLeader: true,
    isJoining: false
  }
};

type ProfileCircleProps = {
  circleId?: number;
};

const ProfileCircle = ({ circleId }: ProfileCircleProps) => {
  const query = useCircleProfile(circleId);

  //if (query.isPending) return <div className="text-[14px]">Loading...</div>;
  //if (query.error) return <div className="text-[14px]">에러가 발생했어요.</div>;

  const result = query.data?.result ?? MOCK_PROFILE_RESULT;

  const info = result.circle_Information;
  const leaderName = info.leader_name;
  const targetId = circleId ?? 0;
  const joinState = info.isJoining ? "COMPLETED" : null;


  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-center">

        {/* Avatar */}
        <Avatar src={info.profileImgUrl} size="xxxl" />
        
        {/* Nickname */}
        <div className="mt-[24px] main-title-medium-emphasized text-on-surface">
          {info.circle_name}
        </div>

        {/* Counter */}
        <div className="mt-[8px] flex items-center gap-[16px]">
          <div className="flex sub-title-medium-emphasized text-on-surface gap-[2px]"> <Icon name="leader" size={"24px"} /> {leaderName} </div>
          <Divider orientation="vertical" thickness={1} style={{ height: 16 }} />
          <Counter variant="label" size="sm" count={info.member_count} label="써클원" />
        </div>
        {/* TODO: circle join/apply button */}
        <ApplyButton
          targetId={targetId}
          joinState={joinState}
          className="mt-[16px]"
        />
      </div>   

      {/* Introduction */}
      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 소개글 </div>
      <div className="mt-[8px] label-xlarge text-on-surface"> {info.introduction} </div>

      {/* History */}
      <div className="mt-[36px] label-xlarge-emphasized text-on-surface"> 활동 정보 </div>
      <div className="mt-[8px] flex flex-col gap-[8px]">
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_green" size={"24px"} />
          <SpeechBubble label="총 N개의 그림을 업로드했어요" />
        </div>
        <div className="flex items-center gap-[16px]">
          <Icon name="char_profile_red" size={"24px"} />
          <SpeechBubble label="회원님은 써클에 N개의 그림을 업로드했어요" />
        </div>
      </div>
    </section>
  );
};

export default ProfileCircle;
