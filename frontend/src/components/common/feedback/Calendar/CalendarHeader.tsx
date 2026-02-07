import { Button } from '../../input/Button';
import { useCalendar } from './CalendarContext';
import { MIN_VIEW_DATE, isMinMonth } from './calendar.utils';

const CalendarHeader = () => {
  const { viewDate, setViewDate, variant } = useCalendar();
  if (variant === 'modal') return null;

  const adjust = (amt: number) => {
    const d = new Date(viewDate);
    d.setMonth(viewDate.getMonth() + amt);
    if (d < MIN_VIEW_DATE) return;
    setViewDate(d);
  };

  const isPrevDisabled = isMinMonth(viewDate);

  return (
    <div className="flex items-center justify-between gap-[24px] w-full">
      <span className="sub-title-xlarge-emphasized text-on-primary">챌린지 캘린더</span>

      <div className="flex items-center gap-[4px]">
        <Button
          variant="onPrimary"
          size="none"
          shape="round"
          icon="arrow_left"
          widthMode="fixed"
          width={40}
          className="px-0"
          iconSize={24}
          aria-label="이전 달"
          disabled={isPrevDisabled}
          onClick={() => adjust(-1)}
        />
        <span className="w-[40px] label-xxxlarge text-on-primary text-center">
          {viewDate.getMonth() + 1}월
        </span>
        <Button
          variant="onPrimary"
          size="none"
          shape="round"
          icon="arrow_right"
          widthMode="fixed"
          width={40}
          className="px-0"
          iconSize={24}
          aria-label="다음 달"
          onClick={() => adjust(1)}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
