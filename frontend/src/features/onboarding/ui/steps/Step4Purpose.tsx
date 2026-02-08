import { useMemo, useState, type ComponentType, type SVGProps } from "react";
import clsx from "clsx";

import { Button } from "../../../../components/common/input/Button/Button";
import { SelectItem } from "../../../../components/common/input/List/SelectItem";

import BadgeSketcher from "../../../../assets/icon/multi/SKETCHER.svg?react";
import BadgePainter from "../../../../assets/icon/multi/PAINTER.svg?react";
import BadgeArtist from "../../../../assets/icon/multi/ARTIST.svg?react";
import BadgeMaster from "../../../../assets/icon/multi/MASTER.svg?react";


type JourneyKey = "sketcher" | "painter" | "artist" | "master";

type Props = {
  onPrev: () => void;
  onSubmit: (payload: { journey: JourneyKey; weeklyGoal: number }) => void;
};

const JOURNEYS: Array<{
  key: JourneyKey;
  title: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  {
    key: "sketcher",
    title: "재미로 그림 그리기: Sketcher",
    desc: "순위 상관없이 자유롭게 그림그리고 싶어요… : 랭킹시스템이 없어요.",
    Icon: BadgeSketcher,
  },
  {
    key: "painter",
    title: "꾸준한 습관: Painter",
    desc: "그림 초보자 추천… : ‘출석점수’를 합산하여 랭킹이 나눠져요",
    Icon: BadgePainter,
  },
  {
    key: "artist",
    title: "성장을 이어가는: Artist",
    desc: "그림 초보자는 아니지만… : ‘출석점수’와 ‘좋아요’를 합산하여 랭킹이 나눠져요",
    Icon: BadgeArtist,
  },
  {
    key: "master",
    title: "전문적으로 활동하는: Master",
    desc: "전문적으로 그림을 그리는 사람… : ‘좋아요’를 합산하여 랭킹이 나눠져요",
    Icon: BadgeMaster,
  },
];

const GOALS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] as const;

export function Step4Purpose({ onPrev, onSubmit }: Props) {
  const [selectedJourney, setSelectedJourney] = useState<JourneyKey | null>(null);
  const [hoveredJourney, setHoveredJourney] = useState<JourneyKey | null>(null);
  const [weeklyGoal, setWeeklyGoal] = useState<number | null>(null);

  const canNext = selectedJourney !== null && weeklyGoal !== null;

  const payload = useMemo(() => {
    if (!canNext) return null;
    return { journey: selectedJourney!, weeklyGoal: weeklyGoal! };
  }, [canNext, selectedJourney, weeklyGoal]);

  /* -------------------------------------------------------------------------- */
  /* Styles (UI 수치 유지 + 토큰 기반)                                           */
  /* -------------------------------------------------------------------------- */

  // Journey card
  const journeyBoxBase =
    "w-[666px] h-[77px] rounded-[16px] border box-border flex items-center relative overflow-hidden";

  // default vs hover를 분리 (지금은 동일했는데, hover 의도가 있으면 border만 올리는 게 자연스러움)
  const journeyBoxDefault = "bg-surface border-outline-variant";
  const journeyBoxHovered = "bg-surface border-outline"; // hover 시 테두리 강조(토큰)
  const journeyBoxSelected = "bg-primary border-transparent";

  // SelectItem 내부는 레이아웃만
  const selectItemInner = "w-full h-full bg-transparent border-0 rounded-none px-[16px]";

  // SelectItem 텍스트 색
  const titleSelected = "text-secondary";
  const subtitleSelected = "text-on-surface-variant-low";

  // Weekly goal box
  const goalBoxBase =
    "w-[666px] h-[111px] rounded-[16px] bg-surface border border-outline-variant";
  const goalShadow = "shadow-[0_0_4px_0_rgba(18,19,21,0.25)]";

  // Track + circles
  const goalTrack =
    "w-full h-[44px] rounded-full p-[4px] flex items-center justify-between bg-surface-variant-low";

  const goalCircleBase =
    "w-[34px] h-[34px] rounded-full inline-flex items-center justify-center border p-0 flex-none shrink-0 transition";

  const goalCircleOff = "bg-surface border-outline-variant";
  const goalCircleOn = "bg-primary border-transparent";

  // Prev button
  const prevBtnClass =
    "w-[82px] h-[60px] rounded-[10px] flex items-center justify-center bg-on-surface-variant-low";

  return (
    <div className="w-full flex flex-col items-center gap-[18px]">
      {/* Title */}
      <div className="flex flex-col items-center gap-[6px]">
        <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
          Greaming을 사용하는 목적을 알려주세요.
        </h2>

        <p className="body-medium-emphasized text-on-surface text-center m-0 opacity-80">
          목표에 맞는 여정을 추천해드릴게요.
        </p>
      </div>

      <p className="label-medium text-on-surface text-left w-[666px] m-0 opacity-60">
        랭킹은 매주 초기화되며, 해당 주의 활동에 맞게 새롭게 바뀌어요.
      </p>

      {/* Journey list */}
      <div className="flex flex-col gap-[10px]">
        {JOURNEYS.map(({ key, title, desc, Icon }) => {
          const selected = selectedJourney === key;
          const hovered = hoveredJourney === key;

          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              className={clsx(
                journeyBoxBase,
                selected
                  ? journeyBoxSelected
                  : hovered
                    ? journeyBoxHovered
                    : journeyBoxDefault,
              )}
              onMouseEnter={() => setHoveredJourney(key)}
              onMouseLeave={() => setHoveredJourney(null)}
              onClick={() => setSelectedJourney(key)}
            >
              <SelectItem
                variant="onboarding"
                selectionStyle="solid"
                selected={selected}
                title={title}
                subtitle={{ variant: "text", value: desc }}
                leading={<Icon width={28} height={28} />}
                className={selectItemInner}
                titleClassName={selected ? titleSelected : "text-on-surface"}
                subtitleClassName={
                  selected ? subtitleSelected : "text-on-surface-variant-lowest"
                }
              />
            </div>
          );
        })}
      </div>

      {/* Weekly goal box */}
      <div className={clsx(goalBoxBase, goalShadow, "px-[16px] flex flex-col justify-center gap-[10px]")}>
        <div className="label-large-emphasized text-on-surface">주간 목표 점수 설정</div>

        {/* Track */}
        <div className={goalTrack}>
          {GOALS.map((g) => {
            const selected = weeklyGoal === g;

            return (
              <button
                key={g}
                type="button"
                onClick={() => setWeeklyGoal(g)}
                className={clsx(goalCircleBase, selected ? goalCircleOn : goalCircleOff)}
              >
                <span
                  className={clsx(
                    "label-medium-emphasized",
                    selected ? "text-secondary" : "text-on-surface-variant-low",
                  )}
                >
                  {g}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="w-full flex items-center justify-between mt-[6px]">
        {/* Prev */}
        <button type="button" onClick={onPrev} className={prevBtnClass}>
          {/* 기존 px값 유지 원하면 네 span 그대로 써도 됨 */}
          <span className="label-xlarge text-on-surface-variant-lowest">이전</span>
        </button>

        {/* Next */}
        <Button
          size="2xl"
          shape="square"
          variant={canNext ? "primary" : "surfaceVariant"}
          className={clsx(
            "w-[572px] h-[60px]",
            "rounded-[6.465px]",
            !canNext && "bg-surface-variant-low",
          )}
          disabled={!canNext}
          onClick={() => payload && onSubmit(payload)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
