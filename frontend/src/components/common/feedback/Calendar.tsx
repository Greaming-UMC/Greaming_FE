import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
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
  variant = 'inline',
  className = "" // 외부에서 위치를 잡을 수 있도록 클래스 허용
}: { 
  children: ReactNode; 
  variant?: 'modal' | 'inline';
  className?: string;
}) => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <CalendarContext.Provider value={{ viewDate, setViewDate, selectedDate, setSelectedDate, variant }}>
      <div className={`calendar-root variant-${variant} flex flex-col items-start w-fit ${className}`}>
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
    <div className="flex items-center justify-between w-full mb-4">
      <span className="sub-title-xlarge-emphasized text-on-primary">챌린지 캘린더</span>
      
      <div className="flex items-center gap-2"> {/* 버튼 사이의 간격을 살짝 좁혀 응집력을 높임 */}
        <button onClick={() => adjust(-1)} className="p-1 rounded-full transition-colors state-layer secondary-opacity-8">
          {/* 색깔 수정 예정*/}
          <Icon name="arrow_left" size={24} />
        </button>

        {/* ⭐️ 핵심: 고정 너비(w-[50px]~[60px])와 중앙 정렬 적용 */}
        <span className="sub-title-xlarge-emphasized text-on-primary w-[40px] text-center">
          {viewDate.getMonth() + 1}월
        </span>

        <button onClick={() => adjust(1)} className="p-1 rounded-full transition-colors state-layer secondary-opacity-8">
          {/* 색깔 수정 예정*/}
          <Icon name="arrow_right" size={24} />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. BodyDays (날짜 선택)                                                     */
/* -------------------------------------------------------------------------- */
const BodyDays = () => {
  const { viewDate, setViewDate, selectedDate, setSelectedDate, variant } = useCalendar();
  const isInline = variant === 'inline';

  const isShowSelected = selectedDate && 
    viewDate.getMonth() === selectedDate.getMonth() && 
    viewDate.getFullYear() === selectedDate.getFullYear();

  // 달력이 열릴 때 실행될 핸들러
  const handleCalendarOpen = () => {
    if (!isInline && selectedDate) {
      setViewDate(selectedDate); // 시점을 선택된 날짜의 달로 강제 이동
    }
  };

  const mockData: Record<string, 'success' | 'fail'> = {
    "2026-01-01": "fail",
    "2026-01-02": "fail",
    "2026-01-05": "success",
    "2026-01-09": "success",
  };

  return (
    /* w-fit으로 감싸서 캘린더 본체 크기만큼만 영역 차지 */
    <div className="w-fit">
      <DatePicker
        fixedHeight
        selected={isShowSelected ? selectedDate : null}
        openToDate={viewDate}
        onCalendarOpen={handleCalendarOpen} 
        onChange={(date: Date | null) => { if (!isInline) setSelectedDate(date); }}
        onSelect={(date: Date | null) => { if (date && !isInline) setViewDate(date); }}
        readOnly={isInline}
        onMonthChange={setViewDate}
        inline={isInline}
        calendarClassName="custom-calendar-height"
        dayClassName={(date: Date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const status = mockData[dateStr];
          let classes = date.getMonth() !== viewDate.getMonth() ? 'outside-day' : 'calendar-day-base';
          if (isInline) {
            classes += " pointer-events-none";
            if (status === 'success') classes += " day-success";
            if (status === 'fail') classes += " day-fail";
          } else {
            classes += " cursor-pointer";
          }
          return classes;
        }}
        formatWeekDay={(name) => name.substring(0, 1).toUpperCase()}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="flex flex-col w-full">
            {isInline ? (
              <div className="flex items-center gap-1 mt-2 px-3">
                <Icon name="daily_check_box" size={20} />
                <h3 className="sub-title-medium-emphasized text-on-surface">데일리 챌린지</h3>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-2 py-2">
                <span className="label-xxlarge-emphasized text-on-surface">
                  {monthDate.getFullYear()}년 {monthDate.getMonth() + 1}월
                </span>
                <div className="flex gap-4">
                  <button type="button" onClick={decreaseMonth} className="p-1 rounded-full state-layer secondary-opacity-8">
                    <Icon name="arrowLeft" size={24} className="text-on-surface" />
                  </button>
                  <button type="button" onClick={increaseMonth} className="p-1 rounded-full state-layer secondary-opacity-8">
                    <Icon name="arrowRight" size={24} className="text-on-surface" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        customInput={!isInline ? (
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
/* 5. BodyWeeks (주차 선택)                                                     */
/* -------------------------------------------------------------------------- */

const BodyWeeks = () => {
  const { viewDate, setViewDate, variant } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedInfo, setSelectedInfo] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    weekIndex: 0,
  });

  // 1. 무조건 6주차까지 고정 배열 생성
  const fixedWeeks = Array.from({ length: 6 }, (_, i) => i);

  // mockData (성공/실패 데이터)
  const weekStatus: Record<number, 'success' | 'fail'> = {
    0: "success",
    // 1: "fail",
  };

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
    setViewDate(d);
  };

  /** * 1. Inline
   */
  const RenderInline = () => (
    <div className="flex flex-col w-full h-full bg-surface p-3 rounded-lg">
      <div className="flex items-center gap-1 mt-2 mb-4 px-3">
        <Icon name="weekly_check_box" size={20} className="text-primary" />
        <h3 className="sub-title-medium-emphasized text-on-surface">위클리 챌린지</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {fixedWeeks.map((index) => {
          const status = weekStatus[index];
          return (
            <div
              key={index}
              className={`
                flex items-center justify-center h-[30px] rounded-3xl transition-colors

                // 성공 시
                ${status === 'success' ? 'bg-primary text-secondary' : ''}
                // fail 시
                ${status === 'fail' ? 'bg-error-container text-on-error-container border border-error' : ''}
                // 일반 상태
                ${!status ? 'bg-surface text-on-surface border-3 border-surface-variant-low' : ''}
              `}
            >
              <span className="label-large-emphasized">{index + 1}주차</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  /** * 2. Modal 
   */
  const RenderModal = () => (
    <div className="relative w-fit" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center px-4 py-3 bg-white border border-outline rounded-small cursor-pointer shadow-sm w-[220px] state-layer primary-opacity-8 h-[44px]"
      >
        <div className="absolute left-4 flex items-center justify-center">
          <Icon name="calendar_month" size={24} className="text-on-surface" />
        </div>
        <span className="label-xxlarge-emphasized text-on-surface text-center pl-4">
          {selectedInfo.month + 1}월 {selectedInfo.weekIndex + 1}주차
        </span> 
      </div>

      {isOpen && (
        <div className="absolute top-[50px] left-1/2 -translate-x-1/2 z-50 bg-surface p-4 shadow-xl rounded-large border border-outline w-[240px]">
          <div className="flex items-center justify-center w-full mb-4 pb-2 border-b border-outline-variant text-on-surface">
            <button onClick={() => adjustMonth(-1)} className="p-1 rounded-full state-layer secondary-opacity-8">
              <Icon name="arrowLeft" size={24} />
            </button>
            <span className="label-xxlarge-emphasized flex-1 text-center">{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월</span>
            <button onClick={() => adjustMonth(1)} className="p-1 rounded-full state-layer secondary-opacity-8">
              <Icon name="arrowRight" size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {fixedWeeks.map((index) => {
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
                      weekIndex: index
                    });
                    setIsOpen(false); 
                  }}
                  className={`
                    flex items-center justify-center h-[44px] rounded-3xl cursor-pointer transition-colors
                    ${isSelected 
                      ? 'bg-primary text-on-primary border-primary' 
                      : 'bg-surface text-on-surface border-3 border-surface-variant-low state-layer primary-opacity-8'
                    }
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
  return (
    <div className={variant === 'inline' ? 'w-full h-full' : 'w-fit'}>
      {variant === 'inline' ? <RenderInline /> : <RenderModal />}
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