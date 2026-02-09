import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/common/layouts/PageContainer";
import CardGrid from "../features/home/ui/card/CardGrid";
import HeroSection from "../features/home/components/HeroSection";
import type { ChallengeType, HomeView } from "../features/home/components/type";

import HomeBg from "../assets/background/home_bg.svg";
import {
  DAILY_CHALLENGE_CARDS,
  WEEKLY_CHALLENGE_CARDS,
} from "../features/home/api/MockHomeChallengeCards";
import CardControls from "../features/home/components/CardControls";

const toHomeView = (raw?: string): HomeView => {
  if (!raw) return "HOME";
  const v = raw.toLowerCase();
  if (v === "daily") return "DAILY";
  if (v === "weekly") return "WEEKLY";
  return "HOME";
};

const HomePage = () => {
  const navigate = useNavigate();
  const { view: viewParam } = useParams<{ view?: string }>();

  const view = toHomeView(viewParam);

  const handleJoin = (type: ChallengeType) => {
    // "DAILY" | "WEEKLY" -> /home/daily | /home/weekly
    navigate(`/home/${type.toLowerCase()}`);
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
