import type { HomeCardType } from "../../../../apis/types/common";
import HeroChallengeCard from "./HeroChallengeCard";
import ChallengeCarousel from "../carousel/ChallengeCarousel";
import ChallengeCarouselTypeSelector, {
  type ChallengeCarouselType,
} from "../carousel/ChallengeCarouselTypeSelector";
import type { ChallengeType } from "../type";

interface Props {
  targetProps: {
    type: "DAILY" | "WEEKLY";
    title: string;
    participantText?: string;
    timeLeftText?: string;
    topic?: string;
  };
  cards: HomeCardType[];
  view: ChallengeCarouselType;
  onJoin: (type: ChallengeType) => void;
}

const ChallengeHeroLayout = ({ targetProps, cards, view, onJoin }: Props) => {
  const LAYOUT_WIDTH = 1541;
  const CAROUSEL_WIDTH = 775;

  return (
    <section className="w-full animate-fadeIn overflow-visible flex justify-center">
      <div 
        className="w-full overflow-visible flex items-start"
        style={{ maxWidth: `${LAYOUT_WIDTH}px` }}
      >
        <div className="shrink-0">
          <HeroChallengeCard {...targetProps} isActive={true} onJoin={onJoin} />
        </div>
        <div 
          className="shrink-0 flex flex-col overflow-visible"
          style={{ width: `${CAROUSEL_WIDTH}px`, height: '361px' }}
        >
          <ChallengeCarouselTypeSelector selectedType={view} mode="single" />

          <div className="flex-1 min-h-0 overflow-visible mt-4">
            <ChallengeCarousel variant="challenge" cards={cards} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeHeroLayout;