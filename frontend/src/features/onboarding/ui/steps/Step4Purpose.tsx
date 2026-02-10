import { useMemo } from "react";
import clsx from "clsx";

import { Button } from "../../../../components/common";
import { useOnboardingSteps } from "../../model/useOnboardingSteps";
import { useOnboarding } from "../../hooks/useOnboarding";
import { JourneySection } from "../components/JourneySection"; 
import { GoalSection } from "../components/GoalSection";

import type { UsagePurpose } from "../../../../apis/types/common";

const PURPOSE_MAP: Record<number, UsagePurpose> = {
  0: "SKETCHER",
  1: "PAINTER",
  2: "ARTIST",
  3: "MASTER",
};

const JOURNEY_LIST = [
  { title: "재미로 그림 그리기: Sketcher", desc: "순위 상관없이 자유롭게 그림그리고 싶어요…", icon: "SKETCHER" },
  { title: "꾸준한 습관: Painter", desc: "그림 초보자 추천…", icon: "PAINTER" },
  { title: "성장을 이어가는: Artist", desc: "그림 초보자는 아니지만…", icon: "ARTIST" },
  { title: "전문적으로 활동하는: Master", desc: "전문적으로 그림을 그리는 사람…", icon: "MASTER" },
];

interface Props {
  onPrev: () => void;
}

export function Step4Purpose({ onPrev }: Props) {
  const { draft, setPurpose, setWeeklyGoal } = useOnboardingSteps();
  const { submitOnboarding, isSubmitting } = useOnboarding();

  const selectedIdx = useMemo(() => {
    return Object.values(PURPOSE_MAP).indexOf(draft.usagePurpose);
  }, [draft.usagePurpose]);

  const canNext = selectedIdx !== -1 && draft.weeklyGoalScore > 0;

  const handleFinish = () => {
    if (!canNext || isSubmitting) return;
    submitOnboarding(draft);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
          Greaming을 사용하는 목적을 알려주세요.
        </h2>
        <p className="body-medium-emphasized text-on-surface text-center m-0 opacity-80">
          목표에 맞는 여정을 추천해드릴게요.
        </p>
      </div>

      {/* Content Section */}
      <div className="w-[666px] flex flex-col gap-6">
        <JourneySection
          list={JOURNEY_LIST}
          selectedIdx={selectedIdx}
          onSelect={(idx) => setPurpose(PURPOSE_MAP[idx])}
        />

        <GoalSection
          goal={draft.weeklyGoalScore}
          onSelect={setWeeklyGoal}
        />
      </div>

      {/* Footer Buttons */}
      <div className="w-full flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="w-[82px] h-[60px] rounded-medium flex items-center justify-center bg-surface-variant-low disabled:opacity-50"
        >
          <span className="label-xlarge text-on-surface-variant-lowest">이전</span>
        </button>

        <Button
          size="2xl"
          shape="square"
          variant={canNext ? "primary" : "surfaceVariant"}
          className={clsx("w-[572px] h-[60px] !rounded-medium")}
          disabled={!canNext || isSubmitting}
          onClick={handleFinish}
        >
          {isSubmitting ? "그리밍 등록 중..." : "그리밍 시작하기"}
        </Button>
      </div>
    </div>
  );
}