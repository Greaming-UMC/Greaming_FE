import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../components/common/layouts/PageContainer";
import CardGrid from "../features/home/ui/card/CardGrid";
import HeroSection from "../features/home/components/HeroSection";
import type { ChallengeType, HomeView } from "../features/home/components/type";
import HomeBg from "../assets/background/home_bg.svg";
import CardControls from "../features/home/components/CardControls";
import type { CheckSubmissionType, SortBy } from "../apis/types/common";

const toHomeView = (raw?: string): HomeView => {
  if (!raw) return "HOME";
  const v = raw.toLowerCase();
  if (v === "daily") return "DAILY";
  if (v === "weekly") return "WEEKLY";
  return "HOME";
};

const todayIso = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}T00:00:00`;
};

const HomePage = () => {
  const navigate = useNavigate();
  const { view: viewParam } = useParams<{ view?: string }>();
  const view = toHomeView(viewParam);

  const handleJoin = (type: ChallengeType) => {
    navigate(`/home/${type.toLowerCase()}`);
  };

  const [gridType, setGridType] = useState<CheckSubmissionType>("ALL");
  const [gridSort, setGridSort] = useState<SortBy>("latest");
  const [gridTags, setGridTags] = useState<string[]>([]);
  const [dateTimeIso, setDateTimeIso] = useState<string>(todayIso());

  const gridView = useMemo(() => view, [view]);

  return (
    <>
      <section  
        className="w-full bg-primary bg-no-repeat bg-top"
        style={{ backgroundImage: `url(${HomeBg})`, backgroundSize: "cover" }}
      >
        <PageContainer>
          <div className="pt-[100px] pb-10">
            <HeroSection view={view} onJoin={handleJoin} />
          </div>
        </PageContainer>
      </section>

      <section className="w-full bg-surface">
        <PageContainer>
          <div className="mx-auto w-full max-w-[1366px]">
            <CardControls
              view={gridView}
              type={gridType}
              sort={gridSort}
              tags={gridTags}
              onChangeType={setGridType}
              onChangeSort={setGridSort}
              onChangeTags={setGridTags}
              dateTimeIso={dateTimeIso}
              onChangeDateTimeIso={setDateTimeIso}
            />

            <CardGrid
              view={gridView}
              type={gridType}
              sort={gridSort}
              dateTimeIso={dateTimeIso}
            />
          </div>
        </PageContainer>
      </section>
    </>
  );
};

export default HomePage;
