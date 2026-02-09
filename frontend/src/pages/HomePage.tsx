import { useMemo, useState } from "react";
import PageContainer from "../components/common/layouts/PageContainer";
import CardControls from "../features/home/components/controls/CardControls";
import CardGrid from "../features/home/components/card/CardGrid";
import HeroSection from "../features/home/components/hero/HeroSection";
import type { ChallengeType, HomeView } from "../features/home/components/type";

import HomeBg from "../assets/background/home_bg.svg";
import {
  DAILY_CHALLENGE_CARDS,
  WEEKLY_CHALLENGE_CARDS,
} from "../features/home/api/MockHomeChallengeCards";

const HomePage = () => {
  const [view, setView] = useState<HomeView>("HOME");

  const handleJoin = (type: ChallengeType) => {
    setView(type); // "DAILY" | "WEEKLY"
  };

  const dailyCards = useMemo(() => DAILY_CHALLENGE_CARDS, []);
  const weeklyCards = useMemo(() => WEEKLY_CHALLENGE_CARDS, []);

  return (
    <>
      <section
        className="w-full bg-primary bg-no-repeat bg-top"
        style={{
          backgroundImage: `url(${HomeBg})`,
          backgroundSize: "cover",
        }}
      >
        <PageContainer>
          <div className="pt-[100px] pb-10">
            <HeroSection
              view={view}
              onJoin={handleJoin}
              dailyCards={dailyCards}
              weeklyCards={weeklyCards}
            />
          </div>
        </PageContainer>
      </section>

      <section className="w-full bg-surface">
        <PageContainer>
          <div className="mx-auto w-full max-w-[1366px]">
            <CardControls view={view} />
            <CardGrid />
          </div>
        </PageContainer>
      </section>
    </>
  );
};

export default HomePage;
