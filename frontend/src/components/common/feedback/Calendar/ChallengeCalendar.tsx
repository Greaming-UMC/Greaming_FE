import type { CSSProperties } from "react";
import { Calendar } from "./Calendar";
import dailyChallenge from "../../../../assets/icon/multi/dailyChallenge.svg";
import weeklyChallenge from "../../../../assets/icon/multi/weeklyChallenge.svg";

interface ChallengeCalendarProps {
  className?: string;
  dailyChallengeDates?: string[];
  weeklyChallengeDates?: string[];
  dayGapX?: number;
}

const ChallengeCalendar = ({
  className = "",
  dailyChallengeDates = [],
  weeklyChallengeDates = [],
  dayGapX = 12,
}: ChallengeCalendarProps) => {
  const calendarStyle = {
    "--calendar-day-gap-x": `${dayGapX}px`,
  } as CSSProperties;

  return (
    <div
      className={`bg-primary rounded-large flex flex-col px-[20px] py-[24px] gap-[12px] w-fit ${className}`}
    >
      <Calendar
        variant="inline"
        className="gap-[12px] w-full"
        style={calendarStyle}
      >
        <Calendar.Header />

        <div className="flex flex-col gap-[12px] bg-surface text-on-surface px-[16px] py-[20px] rounded-large w-full">
          <div className="flex items-center gap-[8px]">
            <img
              src={dailyChallenge}
              alt="daily challenge"
              className="w-[20px] h-[20px]"
            />
            <span className="sub-title-medium-emphasized">데일리 챌린지</span>
          </div>
          <Calendar.BodyDays completedDates={dailyChallengeDates} />
        </div>

        <div className="flex flex-col gap-[12px] bg-surface text-on-surface px-[16px] py-[20px] rounded-large w-full">
          <div className="flex items-center gap-[8px]">
            <img
              src={weeklyChallenge}
              alt="weekly challenge"
              className="w-[20px] h-[20px]"
            />
            <span className="sub-title-medium-emphasized">위클리 챌린지</span>
          </div>
          <Calendar.BodyWeeks completedDates={weeklyChallengeDates} />
        </div>
      </Calendar>
    </div>
  );
};

export { ChallengeCalendar };
