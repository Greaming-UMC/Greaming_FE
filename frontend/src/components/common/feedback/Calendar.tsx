import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

// 챌린지 데이터 예시
const statusData: Record<string, 'success' | 'fail'> = {
  "2026-01-09": "success",
  "2026-01-10": "success",
  "2026-01-03": "fail",
  "2026-01-12": "fail",
};

export const ChallengeCalendar = () => {
  const [viewDate, setViewDate] = useState(new Date());

  const getDayClassName = (date: Date) => {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const status = statusData[dateString];
    const isOutsideMonth = date.getMonth() !== viewDate.getMonth();

    const base = "calendar-day-base";

    if (isOutsideMonth) return `${base} outside-day`;
    if (status === 'success') return `${base} day-success`;
    if (status === 'fail') return `${base} day-fail`;
    
    return base;
  };

  return (
    <div className="p-4 bg-white rounded-3xl shadow-sm inline-block">
        <DatePicker
        fixedHeight
        selected={null}
        onChange={() => {}}
        onMonthChange={(date) => setViewDate(date)}
        dayClassName={getDayClassName}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          /* justify-start로 왼쪽 정렬, gap-2로 요소 간 간격 좁게 설정 */
          <div className="flex items-center justify-start w-full h-10 px-1 gap-0 mb-4">
            {/* 왼쪽 화살표: w-8(32px)로 고정 */}
            <button 
              onClick={decreaseMonth} 
              className="w-8 h-8 flex items-center text-xl font-bold justify-center text-gray-400"
            >
              {"<"}
            </button>
            
            {/* 월 표시: w-16(64px)으로 고정하여 9월/10월 차이 무시 */}
            <span className="w-10 text-center text-xl font-bold inline-block">
              {date.getMonth() + 1}월
            </span>
            
            {/* 오른쪽 화살표: w-8(32px)로 고정 */}
            <button 
              onClick={increaseMonth} 
              className="w-8 h-8 flex items-center text-xl font-bold justify-center text-gray-400"
            >
              {">"}
            </button>
          </div>
        )}
        formatWeekDay={(name) => name.substring(0, 1).toUpperCase()}
      />
    </div>
  );
};