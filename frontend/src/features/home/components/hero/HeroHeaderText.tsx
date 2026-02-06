import type { HomeView } from "../type";

interface Props {
  view: HomeView;
}

const HeroHeaderText = ({ view }: Props) => {
  if (view === "HOME") {
    return (
      <p className="text-center text-on-primary mb-10 leading-snug animate-fadeIn">
        <span className="text-lg">매일, 매주 하나의 주제로 그리는 기록,&nbsp;</span>
        <span className="text-2xl font-bold">그리밍 챌린지</span>
      </p>
    );
  }

  const isDaily = view === "DAILY";
  return (
    <div className="w-full bg-transparent animate-fadeIn">
      <p className="text-left text-on-primary mb-8 leading-snug">
        <span className="text-lg">
          {isDaily ? "매일," : "매주,"} 하나의 주제로 그리는 기록,&nbsp;
        </span>
        <span className="text-2xl font-bold">
          {isDaily ? "데일리 챌린지" : "위클리 챌린지"}
        </span>
      </p>
    </div>
  );
};

export default HeroHeaderText;
