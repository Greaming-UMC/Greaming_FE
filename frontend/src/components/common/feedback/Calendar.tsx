import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import Icon from '../Icon';

/* -------------------------------------------------------------------------- */
/* 1. Context                                                                 */
/* -------------------------------------------------------------------------- */
interface CalendarContextType {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  variant: 'modal' | 'inline';
}

const CalendarContext = createContext<CalendarContextType | null>(null);
const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('Calendar 내부에서 사용하세요.');
  return context;
};

/* -------------------------------------------------------------------------- */
/* 2. Main Root                                                               */
/* -------------------------------------------------------------------------- */
export const CalendarRoot = ({ 
  children, 
  variant = 'inline' 
}: { 
  children: ReactNode; 
  variant?: 'modal' | 'inline';
}) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <CalendarContext.Provider value={{ viewDate, setViewDate, selectedDate, setSelectedDate, variant }}>
      <div className={`calendar-root variant-${variant} flex flex-col items-start w-full`}>
        {children}
      </div>
    </CalendarContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Headers (Inline 전용)                                                   */
/* -------------------------------------------------------------------------- */
const CalendarHeader = () => {
  const { viewDate, setViewDate, variant } = useCalendar();
  if (variant === 'modal') return null;

  const adjust = (amt: number) => {
    const d = new Date(viewDate);
    d.setMonth(viewDate.getMonth() + amt);
    setViewDate(d);
  };

  return (
    <div className="flex items-center justify-between w-full mb-6">
      <span className="sub-title-xlarge-emphasized text-on-surface">챌린지 캘린더</span>
      <div className="flex items-center gap-4">
        <button onClick={() => adjust(-1)} className="p-1 rounded-full transition-colors state-layer secondary-opacity-8">
          <Icon name="arrowLeft" size={24} className="text-on-surface" />
        </button>
        <span className="main-title-small-emphasized text-on-surface">{viewDate.getMonth() + 1}월</span>
        <button onClick={() => adjust(1)} className="p-1 rounded-full transition-colors state-layer secondary-opacity-8">
          <Icon name="arrowRight" size={24} className="text-on-surface" />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. BodyDays (날짜 선택)                                                    */
/* -------------------------------------------------------------------------- */
const BodyDays = ({ type = 'daily' }: { type?: 'daily' | 'weekly' }) => {
  const { viewDate, setViewDate, selectedDate, setSelectedDate, variant } = useCalendar();

  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        onMonthChange={setViewDate}
        inline={variant === 'inline'}
        calendarClassName="custom-calendar-height"
        dayClassName={(date: Date) => 
          date.getMonth() !== viewDate.getMonth() ? 'outside-day' : 'calendar-day-base'
        }
        formatWeekDay={(name) => name.substring(0, 1).toUpperCase()}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="flex flex-col w-full">
            {variant === 'inline' ? (
              <div className="flex items-center gap-2 mb-4 px-1">
                <Icon name={type === 'daily' ? "daily_check_box" : "weekly_check_box"} size={20} />
                <h3 className="sub-title-medium-emphasized text-on-surface">
                  {type === 'daily' ? '데일리 챌린지' : '위클리 챌린지'}
                </h3>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-2 py-2 ">
                <span className="label-xxlarge-emphasized text-on-surface">
                  {monthDate.getFullYear()}년 {monthDate.getMonth() + 1}월
                </span>
                <div className="flex gap-4">
                  <button type="button" onClick={decreaseMonth} className="p-1 rounded-full transition-colors state-layer secondary-opacity-8">
                    <Icon name="arrowLeft" size={24} className="text-on-surface" />
                  </button>
                  <button type="button" onClick={increaseMonth} className="p-1 rounded-full transition-colors state-layer secondary-opacity-8">
                    <Icon name="arrowRight" size={24} className="text-on-surface" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        customInput={variant === 'modal' ? (
          <div className="relative flex items-center justify-center px-4 py-3 bg-white border border-outline rounded-small cursor-pointer shadow-sm w-[220px] state-layer primary-opacity-8 h-[44px]">
            <div className="absolute left-4 flex items-center justify-center">
              <Icon name="calendar_month" size={24} className="text-on-surface" />
            </div>
            <span className="label-xxlarge-emphasized text-on-surface whitespace-nowrap overflow-hidden text-center pl-4">
              {selectedDate?.getFullYear()}년 {selectedDate ? (selectedDate.getMonth() + 1) : 0}월 {selectedDate?.getDate()}일
            </span>
          </div>
        ) : undefined}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. BodyWeeks (주차 선택)                                                   */
/* -------------------------------------------------------------------------- */
const BodyWeeks = ({ type = 'weekly' }: { type?: 'daily' | 'weekly' }) => {
  const { viewDate, setViewDate, variant } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const weeks = [1, 2, 3, 4, 5];

  const adjust = (amt: number) => {
    const d = new Date(viewDate);
    d.setMonth(viewDate.getMonth() + amt);
    setViewDate(d);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    /* h-full을 추가하여 부모 높이에 맞게 늘어날 수 있도록 합니다. */
    <div className="flex flex-col relative w-full h-full" ref={containerRef}>
      <div className={`
        w-full h-full flex flex-col
        ${variant === 'inline' 
          ? 'bg-surface p-3' // 데일리와 동일한 카드 스타일 적용
          : ''}
      `}>
        {/* 상단 헤더 영역 */}
        <div className="w-full">
          {variant === 'inline' ? (
            <div className="flex items-center gap-2 px-1">
              <Icon name={type === 'daily' ? "daily_check_box" : "weekly_check_box"} size={20} className="text-primary" />
              <h3 className="sub-title-medium-emphasized text-on-surface">
                {type === 'daily' ? '데일리 챌린지' : '위클리 챌린지'}
              </h3>
            </div>
          ) : (
            <div 
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center px-4 py-3 bg-white border border-outline rounded-small cursor-pointer shadow-sm w-[220px] mx-auto state-layer primary-opacity-8 h-[44px] mb-2"
            >
              <div className="absolute left-4 flex items-center justify-center">
                <Icon name="calendar_month" size={24} className="text-on-surface" />
              </div>
              <span className="label-xxlarge-emphasized whitespace-nowrap overflow-hidden pl-4">
                {viewDate.getMonth() + 1}월 {selectedWeek}주차
              </span>
            </div>
          )}
        </div>

        {/* 주차 목록 영역 */}
        {(variant === 'inline' || (variant === 'modal' && isOpen)) && (
          <div className={`
            flex flex-col flex-1 /* flex-1을 주어 남은 높이를 차지하게 함 */
            ${variant === 'modal' 
              ? 'absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-surface p-3 shadow-xl rounded-large border border-outline max-w-[260px]' 
              : 'w-full'}
          `}>
            {variant === 'modal' && (
              <div className="flex items-center justify-between w-full mb-3 pb-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); adjust(-1); }}
                  className="p-1 rounded-full transition-colors state-layer secondary-opacity-8"
                >
                  <Icon name="arrowLeft" size={24} className="text-on-surface" />
                </button>
                <span className="label-xxlarge-emphasized">
                  {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); adjust(1); }}
                  className="p-1 rounded-full transition-colors state-layer secondary-opacity-8"
                >
                  <Icon name="arrowRight" size={24} className="text-on-surface" />
                </button>
              </div>
            )}

            {/* 목록 아이템: gap을 조절하여 데일리 캘린더와 높이를 맞춥니다. */}
            <div className={`grid grid-cols-1 justify-items-center ${variant === 'inline' ? 'gap-4 my-auto' : 'gap-2'}`}>
              {weeks.map((w) => {
                const isSelected = selectedWeek === w;
                return (
                  <div 
                    key={w} 
                    onClick={() => { 
                      setSelectedWeek(w);
                      if(variant === 'modal') setIsOpen(false); 
                    }} 
                    className={`week-item border border-transparent cursor-pointer transition-colors
                      ${isSelected 
                        ? 'bg-primary' 
                        : 'bg-surface-variant-high hover:border-outline-variant'}`}
                  >
                    <span className={`
                      text-center whitespace-nowrap font-medium text-[14px]
                      ${isSelected ? 'text-on-primary' : 'text-on-surface'}
                    `}>
                      {viewDate.getMonth() + 1}월 {w}주차
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Export                                                                  */
/* -------------------------------------------------------------------------- */
export const Calendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  BodyDays: BodyDays,
  BodyWeeks: BodyWeeks,
});