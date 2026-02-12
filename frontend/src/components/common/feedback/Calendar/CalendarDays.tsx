import { forwardRef, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import Icon from '../../Icon';
import { Button } from '../../input/Button';
import { useCalendar } from './CalendarContext';
import { clampMinDate, isMinMonth } from './calendar.utils';

export type DailyStatus = 'success' | 'fail';

interface CalendarDaysProps {
  completedDates?: string[];
}

const CalendarDays = ({ completedDates = [] }: CalendarDaysProps) => {
  const { viewDate, setViewDate, selectedDate, setSelectedDate, variant } = useCalendar();
  const isInline = variant === 'inline';

  const isShowSelected =
    selectedDate &&
    viewDate.getMonth() === selectedDate.getMonth() &&
    viewDate.getFullYear() === selectedDate.getFullYear();

  const handleCalendarOpen = () => {
    if (!isInline && selectedDate) {
      setViewDate(selectedDate);
    }
  };

  const statusByDate = useMemo<Record<string, DailyStatus>>(() => {
    const map: Record<string, DailyStatus> = {};
    completedDates.forEach((value) => {
      if (!value) return;
      map[value] = 'success';
    });
    return map;
  }, [completedDates]);

  const CalendarTrigger = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <Button
        ref={ref}
        variant="outlined"
        size="md"
        icon="calender"
        iconSize={24}
        textClassName="label-xxlarge-emphasized"
        aria-label="날짜 선택"
        widthMode="hug"
        onClick={onClick}
      >
        {value}
      </Button>
    ),
  );
  CalendarTrigger.displayName = 'CalendarTrigger';

  return (
    <div className={isInline ? 'w-full flex justify-center' : 'w-fit'}>
      <DatePicker
        fixedHeight
        selected={isShowSelected ? selectedDate : null}
        openToDate={viewDate}
        onCalendarOpen={handleCalendarOpen}
        onChange={(date: Date | null) => {
          if (!isInline) setSelectedDate(date);
        }}
        onSelect={(date: Date | null) => {
          if (date && !isInline) setViewDate(date);
        }}
        readOnly={isInline}
        onMonthChange={(date: Date) => {
          setViewDate(clampMinDate(date));
        }}
        inline={isInline}
        calendarClassName="custom-calendar-height"
        dateFormat="yyyy년 M월 d일"
        dayClassName={(date: Date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const status = statusByDate[dateStr];
          let classes =
            date.getMonth() !== viewDate.getMonth() ? 'outside-day' : 'calendar-day-base';
          if (isInline) {
            classes += ' pointer-events-none';
            if (status === 'success') classes += ' day-success';
            if (status === 'fail') classes += ' day-fail';
          } else {
            classes += ' cursor-pointer';
          }
          return classes;
        }}
        formatWeekDay={(name) => name.substring(0, 1).toUpperCase()}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => {
          if (isInline) return <div className="hidden" />;
          const isPrevMonthDisabled = isMinMonth(monthDate);
          return (
            <div className="flex items-center justify-between w-full px-2 py-2">
              <span className="label-xxlarge-emphasized text-on-surface">
                {monthDate.getFullYear()}년 {monthDate.getMonth() + 1}월
              </span>
              <div className="flex gap-[4px]">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={isPrevMonthDisabled}
                  className="p-1 rounded-full state-layer secondary-opacity-8 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Icon
                    name="arrowLeft"
                    size={24}
                    className="text-on-surface [&_path]:fill-current"
                  />
                </button>
                <button
                  type="button"
                  onClick={increaseMonth}
                  className="p-1 rounded-full state-layer secondary-opacity-8"
                >
                  <Icon
                    name="arrowRight"
                    size={24}
                    className="text-on-surface [&_path]:fill-current"
                  />
                </button>
              </div>
            </div>
          );
        }}
        popperPlacement={!isInline ? 'bottom-end' : undefined}
        popperClassName={!isInline ? 'mt-[4px]' : undefined}
        customInput={!isInline ? <CalendarTrigger /> : undefined}
      />
    </div>
  );
};

export default CalendarDays;
