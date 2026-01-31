import { useState } from "react";
import HomeChallengeHeader from "./HomeChallengeHeader";
import HomeChallengeCarousel from "./HomeChallengeCarousel";
import { useMockHomeChallengeCards } from "../hooks/useMockHomeChallengeCards";

type ChallengeType = "DAILY" | "WEEKLY";

const HomeChallengeSection = () => {
  const [type, setType] = useState<ChallengeType>("DAILY");

  const { cards, movePrev, moveNext } =
    useMockHomeChallengeCards(type);

  return (
    // bg-on-surface-variant-low 는 테스트용
    <section className="py-12 bg-on-surface-variant-low">
      <div className="mx-auto max-w-[1366px] px-6">
        <HomeChallengeHeader
          value={type}
          onChange={setType}
          onMoreClick={() => {}}
        />

        <HomeChallengeCarousel
          cards={cards}
          onPrev={movePrev}
          onNext={moveNext}
        />
      </div>
    </section>
  );
};

export default HomeChallengeSection;
