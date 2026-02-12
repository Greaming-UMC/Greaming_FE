import type { HomeCardType } from "../../../apis/types/common";
import type { ChallengeType, HomeView } from "./type";
import ChallengeHeroLayout from "./ChallengeHeroLayout";
import HeroHeaderText from "../ui/hero/HeroHeaderText";
import HeroLayout from "./HeroLayout";
import { useChallengeCards } from "../api/useChallengeCards";
import { useHome } from "../api/useHome";

interface HeroSectionProps {
  view: HomeView;
  onJoin: (type: ChallengeType) => void;
}

const HeroSection = ({ view, onJoin }: HeroSectionProps) => {
  const homeQuery = useHome();
  const home = homeQuery.data;

  const dailyInfo = home?.dailyChallengeInfo ?? null;
  const weeklyInfo = home?.weeklyChallengeInfo ?? null;

  const dailyProps = dailyInfo
    ? {
        type: "DAILY" as const,
        title: dailyInfo.title,
        participantText: `${dailyInfo.participant}명 참여 중`,
        timeLeftText: dailyInfo.endAt ? `${dailyInfo.endAt}까지` : undefined,
        topic: dailyInfo.description,
      }
    : {
        type: "DAILY" as const,
        title: "진행 중인 데일리 챌린지가 없어요",
        participantText: undefined,
        timeLeftText: undefined,
        topic: undefined,
      };

  const weeklyProps = weeklyInfo
    ? {
        type: "WEEKLY" as const,
        title: weeklyInfo.title,
        participantText: `${weeklyInfo.participant}명 참여 중`,
        timeLeftText: weeklyInfo.endAt ? `${weeklyInfo.endAt}까지` : undefined,
        topic: weeklyInfo.description,
      }
    : {
        type: "WEEKLY" as const,
        title: "진행 중인 주간 챌린지가 없어요",
        participantText: undefined,
        timeLeftText: undefined,
        topic: undefined,
      };

  const dailyCardsQuery = useChallengeCards("DAILY");
  const weeklyCardsQuery = useChallengeCards("WEEKLY");

  const dailyCards: HomeCardType[] = dailyCardsQuery.data ?? [];
  const weeklyCards: HomeCardType[] = weeklyCardsQuery.data ?? [];

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
