// 이슈 #50에서 만든 컴포넌트를 사용할 예정입니다.
import Icon from "../../../components/common/Icon";
import type { HomeCardType } from "../../../apis/types/common";
import HomeCardItem from "./HomeCardItem";

interface Props {
  cards: HomeCardType[];
  onPrev?: () => void;
  onNext?: () => void;
}

const HomeChallengeCarousel = ({ cards, onPrev, onNext }: Props) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-[-40px] top-1/2 -translate-y-1/2"
      >
        <Icon name="arrow_left_circle" size={32} />
      </button>

      <div className="flex gap-3 overflow-hidden">
        {cards.map((card) => (
          <HomeCardItem key={card.submissionId} card={card} />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-[-40px] top-1/2 -translate-y-1/2"
      >
        <Icon name="arrow_right_circle" size={32} />
      </button>
    </div>
  );
};

export default HomeChallengeCarousel;
