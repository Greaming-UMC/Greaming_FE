import HomeHeroChallengeCard from "./HomeHeroChallengeCard"; 

const HomeHeroSection = () => {
  return (
    <section className="w-full bg-primary py-20">
      <div className="mx-auto max-w-[1783px] px-6">
        <p className="text-center text-on-primary mb-12 leading-snug">
          <span className="text-lg">
            매일, 매주 하나의 주제로 그리는 기록,&nbsp;
          </span>
          <span className="text-2xl font-bold">
            그리밍 챌린지
          </span>
        </p>

        <div className="flex justify-center gap-20">
          <HomeHeroChallengeCard
            type="DAILY"
            title="Daily Challenge"
            participantText="참여자 N명 |"
            timeLeftText="남은시간 N시간 N분"
            topic="하늘을 나는 자동차"
          />

          <HomeHeroChallengeCard
            type="WEEKLY"
            title="Weekly Challenge"
            participantText="참여자 N명 |"
            timeLeftText="남은시간 N일 N시간 N분"
            topic="자신 마음속에 있는 괴물"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;