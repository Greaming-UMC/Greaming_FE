import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

import { Button } from "../../../../components/common/input/Button/Button";

import Challenge from "../../../../assets/icon/mono/challenge.png";
import ChallengeBlur from "../../../../assets/icon/mono/challenge_blur.png";
import Journey from "../../../../assets/icon/mono/journey.png";
import JourneyBlur from "../../../../assets/icon/mono/journey_blur.png";
import Circle from "../../../../assets/icon/mono/circle.png";
import CircleBlur from "../../../../assets/icon/mono/circle_blur.png";

type Props = {
  onNext: () => void;
};

function Dot({ active }: { active: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex w-[13px] h-[13px] rounded-full",
        active ? "bg-secondary" : "bg-surface-variant-lowest"
      )}
      aria-hidden="true"
    />
  );
}

type SlideKey = "challenge" | "journey" | "circle";
type Slide = { key: SlideKey; activeSrc: string; sideSrc: string };
type CardSlot = "left" | "center" | "right" | "hidden";

const CARD_MOTION: Record<CardSlot, { x: number; y: number; scale: number; opacity: number; rotate: number }> = {
  left: { x: -182, y: 33, scale: 0.89, opacity: 0.6, rotate: -2 },
  center: { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 },
  right: { x: 182, y: 33, scale: 0.89, opacity: 0.6, rotate: 2 },
  hidden: { x: 0, y: 36, scale: 0.84, opacity: 0, rotate: 0 },
};

const getCardSlot = (slideIndex: number, currentIndex: number, total: number): CardSlot => {
  const diff = (slideIndex - currentIndex + total) % total;

  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === total - 1) return "left";
  return "hidden";
};

export function Step1Welcome({ onNext }: Props) {
  const slides = useMemo<Slide[]>(
    () => [
      { key: "challenge", activeSrc: Challenge, sideSrc: ChallengeBlur },
      { key: "journey", activeSrc: Journey, sideSrc: JourneyBlur },
      { key: "circle", activeSrc: Circle, sideSrc: CircleBlur },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, 2500);

    return () => {
      window.clearInterval(timer);
    };
  }, [slideCount]);

  const go = (to: number) => {
    if (to < 0 || to >= slideCount || to === index) return;
    setIndex(to);
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % slideCount);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + slideCount) % slideCount);
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full flex flex-col items-center pt-[5px] pb-[160px]">
        <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
          Greaming에 오신 것을 환영해요
        </h2>

        <p className="label-xxxlarge-emphasized text-on-surface text-center m-0 mt-[14px]">
          매주 새로운 그림을 그리고 여정을 함께 나아가는 커뮤니티입니다.
        </p>

        <div className="mt-[24px] w-full flex flex-col items-center">
          {/* stage: 684 x 446.86 */}
          <div className="relative w-[684px] h-[446.86px]">
            {slides.map((slide, slideIndex) => {
              const slot = getCardSlot(slideIndex, index, slideCount);
              if (slot === "hidden") return null;

              const isCenter = slot === "center";
              const onCardClick = slot === "left" ? prevCard : nextCard;

              return (
                <motion.button
                  key={slide.key}
                  type="button"
                  aria-label={slot === "left" ? "이전 카드" : "다음 카드"}
                  onClick={onCardClick}
                  className={clsx(
                    "absolute top-0 left-1/2 -translate-x-1/2",
                    "w-[360px] h-[446.86px] overflow-hidden rounded-[15.7px]",
                    "select-none cursor-pointer",
                    isCenter ? "z-30" : "z-20"
                  )}
                  animate={CARD_MOTION[slot]}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={isCenter ? slide.activeSrc : slide.sideSrc}
                    alt=""
                    draggable={false}
                    className={clsx(
                      "w-full h-full object-cover transition-opacity duration-300",
                      isCenter ? "opacity-100" : "opacity-92"
                    )}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* dots */}
          <div className="mt-[18px] flex items-center justify-center gap-[8px]">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                className="p-[2px]"
                aria-label={`${i + 1}번째 카드로 이동`}
                onClick={() => go(i)}
              >
                <Dot active={index === i} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* next button */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[56px]">
        <Button
          size="2xl"
          shape="square"
          variant="primary"
          className="w-[666px] h-[60px] rounded-[8px]"
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
