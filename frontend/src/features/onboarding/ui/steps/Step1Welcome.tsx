import ChallengeIcon from "../../../../assets/icon/mono/intro_Challenge.svg?react";
import JourneyIcon from "../../../../assets/icon/mono/intro_Jeorney.svg?react";
import CommunityIcon from "../../../../assets/icon/mono/intro_Community.svg?react";
import LeagueIcon from "../../../../assets/icon/mono/intro_League.svg?react";

import { IntroFeatureCard } from "../components/IntroFeatureCard";
import { Button } from "../../../../components/common/input/Button/Button";

export function Step1Welcome({ onNext }: { onNext: () => void }) {
  return (
    
    <div className="w-full h-full flex flex-col items-center">
    
      <div className="flex flex-col items-center gap-[20px]">
        <h2
          className="text-center"
          style={{
            color: "var(--Schemes-Primary, #121315)",
            fontFamily: "Pretendard",
            fontSize: "28px",
            fontWeight: 700,
            lineHeight: "36px",
            margin: 0,
          }}
        >
          Greaming에 오신 것을 환영해요
        </h2>

        <p
          className="text-center"
          style={{
            color: "var(--Schemes-Primary, #121315)",
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "26px",
            margin: 0,
          }}
        >
          매주 새로운 그림을 그리며 여정을 함께 나아가는 커뮤니티입니다.
        </p>
      </div>

      {/* 카드 영역: (타이틀 블록 아래로 적당히 띄우기) */}
      <div className="mt-[48px] grid grid-cols-2 gap-[16px]">
        <IntroFeatureCard
          icon={<ChallengeIcon className="w-[64px] h-[64px]" />}
          title="일간·주간 챌린지"
          description="매번 새로운 주제로 그림을 그리고 공유하세요."
        />
        <IntroFeatureCard
          icon={<JourneyIcon className="w-[64px] h-[64px]" />}
          title="여정 시스템"
          description="여정을 통해 단계별로 성장하세요."
        />
        <IntroFeatureCard
          icon={<CommunityIcon className="w-[64px] h-[64px]" />}
          title="커뮤니티"
          description="다른 크리에이터와 교류하며 영감을 얻으세요."
        />
        <IntroFeatureCard
          icon={<LeagueIcon className="w-[64px] h-[64px]" />}
          title="리그 시스템"
          description="꾸준히 참여하며 레벨을 올리세요."
        />
      </div>

      <div className="mt-[88px]">
        <Button size="2xl" shape="square" className="w-[666px]" onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
