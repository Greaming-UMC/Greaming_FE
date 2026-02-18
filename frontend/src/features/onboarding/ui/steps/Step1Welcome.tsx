import { useMemo, useState } from "react";
import clsx from "clsx";

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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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

  const go = (to: number) => setIndex(clamp(to, 0, slides.length - 1));
  const nextCard = () => go(index + 1);
  const prevCard = () => go(index - 1);

  const showLeft = index === 1 || index === 2;
  const showRight = index === 0 || index === 1;

  const leftPosClass =
    index === 1
      ? "left-[calc(50%_-_180px_-_128px)]"
      : index === 2
        ? "left-[calc(50%_-_180px_-_88px)]"
        : "";

  const rightPosClass =
    index === 0
      ? "left-[calc(50%_-_180px_+_127.625px)]"
      : index === 1
        ? "left-[calc(50%_-_180px_+_127.995px)]"
        : "";

  const sideTopClass = "top-[33.43px]";

  const sideBase =
    "absolute z-10 select-none cursor-pointer overflow-hidden " +
    "w-[320.375px] h-[380px] rounded-[13.3px] " +
    sideTopClass;

  const frontBase =
    "absolute top-0 left-1/2 -translate-x-1/2 " +
    "z-20 select-none cursor-pointer overflow-hidden " +
    "w-[360px] h-[446.86px] rounded-[15.7px]";

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
            {/* left side */}
            {showLeft && index - 1 >= 0 && (
              <button
                type="button"
                aria-label="이전 카드"
                onClick={prevCard}
                className={clsx(sideBase, leftPosClass)}
              >
                <img
                  src={slides[index - 1].sideSrc}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </button>
            )}

            {/* right side */}
            {showRight && index + 1 < slides.length && (
              <button
                type="button"
                aria-label="다음 카드"
                onClick={nextCard}
                className={clsx(sideBase, rightPosClass)}
              >
                <img
                  src={slides[index + 1].sideSrc}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-cover"
                />
              </button>
            )}

            {/* front */}
            <button
              type="button"
              aria-label="다음 카드"
              onClick={nextCard}
              className={frontBase}
            >
              <img
                src={slides[index].activeSrc}
                alt=""
                draggable={false}
                className="w-full h-full object-cover"
              />
            </button>
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
