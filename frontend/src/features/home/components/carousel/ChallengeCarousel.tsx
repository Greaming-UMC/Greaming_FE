import { useMemo, useState } from "react";
import CardItem from "../card/CardItem";
import type { HomeCardType } from "../../../../apis/types/common";
import Icon from "../../../../components/common/Icon";

type CarouselVariant = "home" | "challenge";

interface Props {
  variant: CarouselVariant;
  cards: HomeCardType[];
}

const ORIGINAL_CARD_WIDTH = 250;

const CAROUSEL_CONFIG: Record<
  CarouselVariant,
  { visibleCount: number; step: number; gap: number; itemWidth: number; arrowGutter: number }
> = {
  home: { visibleCount: 5, step: 4, gap: 24, itemWidth: 250, arrowGutter: 56 },
  challenge: { visibleCount: 2.5, step: 2, gap: 18, itemWidth: 270, arrowGutter: 32 },
};

const ChallengeCarousel = ({ variant, cards }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { visibleCount, step, gap, itemWidth, arrowGutter } = CAROUSEL_CONFIG[variant];
  const scale = itemWidth / ORIGINAL_CARD_WIDTH;

  const renderCount = useMemo(() => Math.ceil(visibleCount) + 1, [visibleCount]);

  const visibleCards = useMemo(() => {
    if (cards.length === 0) return [];
    const result: Array<HomeCardType & { keyId: string }> = [];

    for (let i = 0; i < renderCount; i++) {
      const idx = (currentIndex + i) % cards.length;
      result.push({ 
        ...cards[idx], 
        keyId: `${variant}-${cards[idx].submissionId}-${i}` 
      });
    }
    return result;
  }, [cards, currentIndex, renderCount, variant]);

  const handleNext = () => {
    if (cards.length === 0) return;
    setCurrentIndex((prev) => (prev + step) % cards.length);
  };

  const handlePrev = () => {
    if (cards.length === 0) return;
    setCurrentIndex((prev) => (prev - step + cards.length) % cards.length);
  };

  const viewportWidth = useMemo(() => {
    const gaps = Math.ceil(visibleCount) - 1; 
    return itemWidth * visibleCount + gap * gaps;
  }, [visibleCount, itemWidth, gap]);

  const totalContainerWidth = viewportWidth + (arrowGutter * 2);

  return (
    <div 
      className={`relative overflow-visible ${variant === 'home' ? 'mx-auto' : ''}`}
      style={{ width: `${totalContainerWidth}px` }}
    >
      <div
        className="relative w-full"
        style={{
          paddingLeft: `${arrowGutter}px`,
          paddingRight: `${arrowGutter}px`,
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          aria-label="이전"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-end"
          style={{ width: `${arrowGutter}px` }}
        >
          <Icon name="arrow_left_circle" size={32} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="다음"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-start"
          style={{ width: `${arrowGutter}px` }}
        >
          <Icon name="arrow_right_circle" size={32} />
        </button>

        <div className="mx-auto overflow-hidden py-2" style={{ width: `${viewportWidth}px` }}>
          <div className="flex transition-transform duration-500 ease-in-out" style={{ gap: `${gap}px` }}>
            {visibleCards.map((card) => {
              return (
                <div
                  key={card.keyId}
                  className="shrink-0 transition-all duration-300"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${285 * scale}px`,
                  }}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      width: `${ORIGINAL_CARD_WIDTH}px`,
                    }}
                  >
                    <CardItem card={card} context="carousel" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCarousel;