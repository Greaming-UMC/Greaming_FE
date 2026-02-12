import { useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { Button } from "../../../../components/common/input/Button/Button";
import { SelectItem } from "../../../../components/common/input/List/SelectItem";
import { OnboardingCompleteModal } from "../../../../components/common/feedback/OnboardingCompleteModal";

import { useOnboarding } from "../../hooks/useOnboarding";
import type { UsagePurpose, UserInformations } from "../../../../apis/types/common";

import BadgeSketcher from "../../../../assets/icon/multi/SKETCHER.svg?react";
import BadgePainter from "../../../../assets/icon/multi/PAINTER.svg?react";
import BadgeArtist from "../../../../assets/icon/multi/ARTIST.svg?react";
import BadgeMaster from "../../../../assets/icon/multi/MASTER.svg?react";

type JourneyKey = "sketcher" | "painter" | "artist" | "master";

type Props = {
  onPrev: () => void;

  draft: UserInformations;
  setPurpose: (purpose: UsagePurpose) => void;
  setWeeklyGoal: (goal: number) => void;
};

const PURPOSE_MAP: Record<JourneyKey, UsagePurpose> = {
  sketcher: "SKETCHER",
  painter: "PAINTER",
  artist: "ARTIST",
  master: "MASTER",
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

export function Step4Purpose({ onPrev, draft, setPurpose, setWeeklyGoal }: Props) {
  const navigate = useNavigate();
  const { submitOnboarding, isSubmitting } = useOnboarding();

  const [hoveredJourney, setHoveredJourney] = useState<JourneyKey | null>(null);
  const [completeOpen, setCompleteOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const selectedJourney = useMemo(() => {
    if (!draft.usagePurpose) return null;
    const entry = Object.entries(PURPOSE_MAP).find(([, v]) => v === draft.usagePurpose);
    return (entry?.[0] as JourneyKey) ?? null;
  }, [draft.usagePurpose]);

  const canNext = selectedJourney !== null && (draft.weeklyGoalScore ?? 0) > 0;

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleComplete = async () => {
    if (!canNext || isSubmitting || completeOpen) return;

    try {
      await submitOnboarding(draft); 

      setCompleteOpen(true);
      timerRef.current = window.setTimeout(() => {
        navigate("/home"); 
      }, 3000);
    } catch (e) {
      console.error(e);
      alert("등록에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };
  const blurShadow = "shadow-[0_0_4px_0_rgba(18,19,21,0.25)]";

  const journeyBase =
    "w-[666px] h-[77px] rounded-[16px] overflow-hidden flex items-center transition";

  const journeyDefault = clsx("bg-surface", blurShadow);
  const journeyHover = clsx("bg-surface-variant-low", blurShadow);
  const journeySelected = clsx("bg-primary", blurShadow);

  const selectItemInner = "w-full h-full bg-transparent border-0 rounded-none px-[16px]";

  const goalBox = clsx(
    "w-[666px] h-[111px] rounded-[16px] bg-surface px-[16px] flex flex-col justify-center gap-[10px]",
    blurShadow
  );

  const goalTrack =
    "w-full h-[44px] rounded-full p-[4px] flex items-center justify-between bg-surface-variant-low";

  const goalCircleBase =
    "w-[34px] h-[34px] rounded-full flex items-center justify-center transition";

  const goalOff = clsx("bg-surface", blurShadow);
  const goalOn = clsx("bg-primary", blurShadow);

  const prevBtnClass = clsx(
    "w-[82px] h-[60px] rounded-[10px] flex items-center justify-center bg-on-surface-variant-low",
    blurShadow
  );

  return (
    <>
      <div className="w-full flex flex-col items-center gap-[18px]">
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
                  journeyBase,
                  selected ? journeySelected : hovered ? journeyHover : journeyDefault
                )}
                onMouseEnter={() => setHoveredJourney(key)}
                onMouseLeave={() => setHoveredJourney(null)}
                onClick={() => setPurpose(PURPOSE_MAP[key])}
              >
                <SelectItem
                  variant="onboarding"
                  selectionStyle="solid"
                  selected={selected}
                  title={title}
                  subtitle={{ variant: "text", value: desc }}
                  leading={<Icon width={28} height={28} />}
                  className={selectItemInner}
                  titleClassName={selected ? "text-secondary" : "text-on-surface"}
                  subtitleClassName="text-on-surface-variant-lowest"
                />
              </div>
            );
          })}
        </div>

        <div className={goalBox}>
          <div className="label-large-emphasized text-on-surface">주간 목표 점수 설정</div>

          <div className={goalTrack}>
            {GOALS.map((g) => {
              const selected = draft.weeklyGoalScore === g;

              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setWeeklyGoal(g)}
                  className={clsx(goalCircleBase, selected ? goalOn : goalOff)}
                >
                  <span
                    className={clsx(
                      "label-medium-emphasized",
                      selected ? "text-secondary" : "text-on-surface-variant-low"
                    )}
                  >
                    {g}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full flex items-center justify-between mt-[6px]">
          <button
            type="button"
            onClick={onPrev}
            className={prevBtnClass}
            disabled={isSubmitting || completeOpen}
          >
            <span className="label-xlarge text-on-surface-variant-lowest">이전</span>
          </button>

          <Button
            size="2xl"
            shape="square"
            variant={canNext ? "primary" : "surfaceVariant"}
            className={clsx(
              "w-[572px] h-[60px] rounded-[6.465px]",
              !canNext && "bg-surface-variant-low"
            )}
            disabled={!canNext || isSubmitting || completeOpen}
            onClick={handleComplete}
          >
            완료
          </Button>
        </div>
      </div>

      <OnboardingCompleteModal open={completeOpen} />
    </>
  );
}
