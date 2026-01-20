import { Calendar } from "./Calendar";


interface ChallengeCalendarProps {
  className?: string;
}

const ChallengeCalendar = ({ className = "" }: ChallengeCalendarProps) => {
  return (
    <div className={`bg-black rounded-2xl py-6 px-5 w-fit flex flex-col gap-4 ${className}`}>
      <Calendar variant="inline">
        {/* 상단 월 이동 및 타이틀 영역 */}
        <div className="w-full">
          <Calendar.Header />
        </div>

        {/* 데일리 챌린지 (달력) */}
        <Calendar.BodyDays />

        {/* 간격 조절용 스페이서 */}
        <div className="mb-2" />

        {/* 위클리 챌린지 (주차별 현황) */}
        <Calendar.BodyWeeks />
      </Calendar>
    </div>
  );
};

export {ChallengeCalendar};