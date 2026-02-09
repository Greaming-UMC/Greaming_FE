import ChallengeIcon from "../../../../assets/icon/mono/intro_Challenge.svg?react";
import JourneyIcon from "../../../../assets/icon/mono/intro_Jeorney.svg?react";
import CommunityIcon from "../../../../assets/icon/mono/intro_Community.svg?react";
import LeagueIcon from "../../../../assets/icon/mono/intro_League.svg?react";

import { IntroFeatureCard } from "../components/IntroFeatureCard";
import { Button } from "../../../../components/common/input/Button/Button";

export function Step1Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-5">
        <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
          Greaming에 오신 것을 환영해요
        </h2>

        <p className="sub-title-large-emphasized text-on-surface text-center m-0">
          매주 새로운 그림을 그리며 여정을 함께 나아가는 커뮤니티입니다.
        </p>
      </div>

      {/* 카드 영역 */}
      <div className="mt-12 grid grid-cols-2 gap-4">
        <IntroFeatureCard
          icon={<ChallengeIcon className="w-16 h-16" />}
          title="일간·주간 챌린지"
          description="매번 새로운 주제로 그림을 그리고 공유하세요."
        />
        <IntroFeatureCard
          icon={<JourneyIcon className="w-16 h-16" />}
          title="여정 시스템"
          description="여정을 통해 단계별로 성장하세요."
        />
        <IntroFeatureCard
          icon={<CommunityIcon className="w-16 h-16" />}
          title="커뮤니티"
          description="다른 크리에이터와 교류하며 영감을 얻으세요."
        />
        <IntroFeatureCard
          icon={<LeagueIcon className="w-16 h-16" />}
          title="리그 시스템"
          description="꾸준히 참여하며 레벨을 올리세요."
        />
      </div>

      <div className="mt-22">
        <Button size="2xl" shape="square" className="w-166.5" onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}