
import clsx from "clsx";
import { Button } from "../../../../../components/common";

interface Props {
  goal: number;
  onSelect: (score: number) => void;
}

export const GoalSection = ({ goal, onSelect }: Props) => (
  <div className={clsx("flex flex-col gap-4 p-4 bg-surface rounded-large shadow-1")}>
    <h4 className="sub-title-large-emphasized text-on-surface">주간 목표 점수 설정</h4>
    <div className="flex justify-between p-2 bg-surface-variant-low rounded-full px-4 h-12 items-center">
      {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((score) => (
        <Button
          key={score}
          variant={goal === score ? "primary" : "surface"}
          shape="round" 
          onClick={() => onSelect(score)} 
          className={clsx("w-10 h-10 !p-0 flex items-center justify-center transition-all", goal !== score && "text-on-surface-variant-low")}
        >
          {score}
        </Button>
      ))}
    </div>
  </div>
);