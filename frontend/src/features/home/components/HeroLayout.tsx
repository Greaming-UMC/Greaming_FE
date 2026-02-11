import { useState } from "react";
import type { HomeCardType } from "../../../apis/types/common";
import HeroChallengeCard from "../ui/hero/HeroChallengeCard";
import ChallengeCarousel from "../ui/carousel/ChallengeCarousel";
import ChallengeCarouselTypeSelector, { type ChallengeCarouselType } from "../ui/carousel/ChallengeCarouselTypeSelector";
import type { ChallengeType } from "./type";

interface Props {
  dailyProps: {
    type: "DAILY";
    title: string;
    participantText?: string;
    timeLeftText?: string;
    topic?: string;
  };
  weeklyProps: {
    type: "WEEKLY";
    title: string;
    participantText?: string;
    timeLeftText?: string;
    topic?: string;
  };
  dailyCards: HomeCardType[];
  weeklyCards: HomeCardType[];
  onJoin: (type: ChallengeType) => void;
}

const HeroLayout = ({ dailyProps, weeklyProps, dailyCards, weeklyCards, onJoin }: Props) => {
  const [homeCarouselType, setHomeCarouselType] = useState<ChallengeCarouselType>("DAILY");
  const homeCards = homeCarouselType === "DAILY" ? dailyCards : weeklyCards;

  return (
    <section className="w-full animate-fadeIn flex flex-col items-center">
      <div className="w-full mx-auto max-w-[1458px] mb-12">
        <div className="grid grid-cols-2 justify-items-center gap-x-[78px]">
          <HeroChallengeCard {...dailyProps} onJoin={onJoin} isActive={false} />
          <HeroChallengeCard {...weeklyProps} onJoin={onJoin} isActive={false} />
        </div>
      </div>

      <div className="w-full mx-auto max-w-[1458px]">
        <div className="mb-3 w-[1346px] mx-auto">
          <ChallengeCarouselTypeSelector
            selectedType={homeCarouselType}
            onSelectType={setHomeCarouselType}
            onMoreClick={() => onJoin(homeCarouselType)}
          />
        </div>

        <ChallengeCarousel variant="home" cards={homeCards} />
      </div>
    </section>
  );
};

export default HeroLayout;
