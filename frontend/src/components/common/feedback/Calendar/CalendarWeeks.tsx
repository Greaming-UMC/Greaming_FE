import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../../Icon';
import { Button } from '../../input/Button';
import { useCalendar } from './CalendarContext';
import { MIN_VIEW_DATE, getWeeksInMonth, isMinMonth, getWeekIndexInMonth } from './calendar.utils';

export type WeeklyStatus = 'success' | 'fail';

interface CalendarWeeksProps {
  completedDates?: string[];
}

const CalendarWeeks = ({ completedDates = [] }: CalendarWeeksProps) => {
  const { viewDate, setViewDate, variant } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedInfo, setSelectedInfo] = useState(() => ({
    year: viewDate.getFullYear(),
    month: viewDate.getMonth(),
    weekIndex: getWeekIndexInMonth(viewDate),
  }));

  const weeksInMonth = getWeeksInMonth(viewDate);
  const weeks = Array.from({ length: weeksInMonth }, (_, i) => i);

  const weekStatus = useMemo<Record<number, WeeklyStatus>>(() => {
    const map: Record<number, WeeklyStatus> = {};
    completedDates.forEach((value) => {
      const [y, m, d] = value.split('-').map(Number);
      if (!y || !m || !d) return;
      const date = new Date(y, m - 1, d);
      if (
        date.getFullYear() === viewDate.getFullYear() &&
        date.getMonth() === viewDate.getMonth()
      ) {
        const index = getWeekIndexInMonth(date);
        map[index] = 'success';
      }
    });
    return map;
  }, [completedDates, viewDate]);

  useEffect(() => {
    if (isOpen && variant === 'modal') {
      const savedDate = new Date(selectedInfo.year, selectedInfo.month, 1);
      setViewDate(savedDate);
    }
  }, [isOpen, variant, selectedInfo.year, selectedInfo.month, setViewDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const adjustMonth = (amount: number) => {
    const d = new Date(viewDate);
    d.setMonth(d.getMonth() + amount);
    if (d < MIN_VIEW_DATE) return;
    setViewDate(d);
  };

  const RenderInline = () => (
    <div className="grid grid-cols-3 gap-[8px] w-full justify-items-center">
      {weeks.map((index) => {
        const status = weekStatus[index];
        return (
          <div
            key={index}
            className={`
              flex items-center justify-center h-[32px] w-[104px] rounded-full shadow-sm
              ${status === 'success' ? 'bg-primary text-secondary' : ''}
              ${status === 'fail' ? 'bg-error-container text-on-error-container' : ''}
              ${!status ? 'bg-surface text-on-surface' : ''}
            `}
          >
            <span className="label-xlarge">{index + 1}주차</span>
          </div>
        );
      })}
    </div>
  );

  const RenderModal = () => (
    <div className="relative w-fit" ref={containerRef}>
      <Button
        variant="outlined"
        size="md"
        icon="calender"
        iconSize={24}
        textClassName="label-xxlarge-emphasized"
        aria-label="주차 선택"
        widthMode="hug"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedInfo.month + 1}월 {selectedInfo.weekIndex + 1}주차
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-[4px] z-50 bg-surface p-4 shadow-xl rounded-large border border-outline w-[240px]">
          <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-outline-variant text-on-surface">
            <span className="label-xxlarge-emphasized text-on-surface">
              {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
            </span>
            <div className="flex gap-[4px]">
              <button
                onClick={() => adjustMonth(-1)}
                disabled={isMinMonth(viewDate)}
                className="p-1 rounded-full state-layer secondary-opacity-8 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Icon
                  name="arrowLeft"
                  size={24}
                  className="text-on-surface [&_path]:fill-current"
                />
              </button>
              <button
                onClick={() => adjustMonth(1)}
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

          <div className="flex flex-col gap-2">
            {weeks.map((index) => {
              const isSelected =
                viewDate.getFullYear() === selectedInfo.year &&
                viewDate.getMonth() === selectedInfo.month &&
                selectedInfo.weekIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedInfo({
                      year: viewDate.getFullYear(),
                      month: viewDate.getMonth(),
                      weekIndex: index,
                    });
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center justify-center h-[44px] rounded-3xl cursor-pointer transition-all border-none shadow-1
                    ${isSelected ? 'bg-primary text-on-primary border-primary' : 'bg-surface text-on-surface border-3 border-surface-variant-low state-layer primary-opacity-8'}
                  `}
                >
                  <span className="label-large-emphasized">{index + 1}주차</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return <div className={variant === 'inline' ? 'w-full h-full' : 'w-fit'}>{variant === 'inline' ? <RenderInline /> : <RenderModal />}</div>;
};

export default CalendarWeeks;
