import type { HomeView } from "../../components/type";

interface Props {
  view: HomeView;
}

const HeroHeaderText = ({ view }: Props) => {
  if (view === "HOME") {
    return (
      <p className="text-center text-on-primary mb-10 leading-snug animate-fadeIn">
        <span className="main-title-small-emphasized">매일, 매주 하나의 주제로 그리는 기록,&nbsp;</span>
        <span className="main-title-medium-emphasized"> 그리밍 챌린지</span>
      </p>
    );
  }

  const isDaily = view === "DAILY";
  return (
    <div className="w-full bg-transparent animate-fadeIn">
      <p className="main-title-small-emphasized text-on-primary mb-8 leading-snug">
        <span>
          {isDaily ? "매일," : "매주,"} 하나의 주제로 그리는 기록,&nbsp;
        </span>
        <span className="main-title-medium-emphasized text-on-primary">
          {isDaily ? "데일리 챌린지" : "위클리 챌린지"}
        </span>
      </p>
    </div>
  );
};

export default HeroHeaderText;
