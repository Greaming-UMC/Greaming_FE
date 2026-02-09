import type { HomeCardType } from "../../../apis/types/common";
import { DAILY_CHALLENGE_CARDS, WEEKLY_CHALLENGE_CARDS } from "../api/MockHomeChallengeCards";
import { useHeroChallengeProps } from "../hooks/useHeroChallengeProps";
import type { ChallengeType, HomeView } from "./type";
import ChallengeHeroLayout from "./ChallengeHeroLayout";
import HeroHeaderText from "../ui/hero/HeroHeaderText";
import HeroLayout from "./HeroLayout";

interface HeroSectionProps {
  view: HomeView;
  onJoin: (type: ChallengeType) => void;
  dailyCards?: HomeCardType[];
  weeklyCards?: HomeCardType[];
}

const HeroSection = ({
  view,
  onJoin,
  dailyCards = DAILY_CHALLENGE_CARDS,
  weeklyCards = WEEKLY_CHALLENGE_CARDS,
}: HeroSectionProps) => {
  const { dailyProps, weeklyProps } = useHeroChallengeProps();

  const currentCards = view === "DAILY" ? dailyCards : weeklyCards;
  const targetProps = view === "DAILY" ? dailyProps : weeklyProps;

  return (
    <section className="w-full flex flex-col items-center pb-10">
      <div className="w-full max-w-[1458px] px-4 mb-6">
        <HeroHeaderText view={view} />
      </div>

      {view === "HOME" ? (
        <div className="w-full max-w-[1458px]">
          <HeroLayout
            dailyProps={dailyProps}
            weeklyProps={weeklyProps}
            dailyCards={dailyCards}
            weeklyCards={weeklyCards}
            onJoin={onJoin}
          />
        </div>
      ) : (
        <ChallengeHeroLayout
          targetProps={targetProps}
          cards={currentCards}
          view={view}
          onJoin={onJoin}
        />
      )}
    </section>
  );
};

export default HeroSection;