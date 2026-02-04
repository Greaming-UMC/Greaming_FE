const HomeChallengeHeroText = () => {
  return (
    // bg-transparent로 대체 예정
    <div className="mx-auto max-w-[1783px] px-6 bg-primary">
        <p className="text-left text-on-primary mb-12 leading-snug">
          <span className="text-lg">
            매일, 하나의 주제로 그리는 기록,&nbsp;
          </span>
          <span className="text-2xl font-bold">
            데일리 챌린지
          </span>
        </p>

        <p className="text-left text-on-primary mb-12 leading-snug">
          <span className="text-lg">
            매주, 하나의 주제로 그리는 기록,&nbsp;
          </span>
          <span className="text-2xl font-bold">
            위클리 챌린지
          </span>
        </p>
    </div>
  );
};

export default HomeChallengeHeroText;
