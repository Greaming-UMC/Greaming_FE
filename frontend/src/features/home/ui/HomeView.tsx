import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardGrid from "./card/CardGrid";
import HeroSection from "../components/HeroSection";
import CardControls from "../components/CardControls";
import type { ChallengeType, HomeView as HomeViewType } from "../components/type";
import type { CheckSubmissionType, SortBy } from "../../../apis/types/common";

const toHomeView = (raw?: string): HomeViewType => {
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

const HomeView = () => {
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

  return (
    <>
      <section className="-mt-14 w-full min-h-200 bg-home">
        <div className="mx-auto w-full max-w-[1783px] px-6 pt-44 pb-10">
          <HeroSection view={view} onJoin={handleJoin} dateTimeIso={dateTimeIso} />
        </div>
      </section>

      <section className="w-full bg-surface pt-[96px]">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <CardControls
            view={view}
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
            view={view}
            type={gridType}
            sort={gridSort}
            tags={gridTags}
            dateTimeIso={dateTimeIso}
          />
        </div>
      </section>
    </>
  );
};

export default HomeView;