import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { CalendarContext } from './CalendarContext';
import { clampMinDate } from './calendar.utils';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarWeeks from './CalendarWeeks';

export const CalendarRoot = ({
  children,
  variant = 'inline',
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: 'modal' | 'inline';
  className?: string;
  style?: CSSProperties;
}) => {
  const now = new Date();
  const initialDate = clampMinDate(now);
  const [viewDate, setViewDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  return (
    <CalendarContext.Provider
      value={{ viewDate, setViewDate, selectedDate, setSelectedDate, variant }}
    >
      <div
        className={`calendar-root variant-${variant} flex flex-col items-start w-fit ${className}`}
        style={style}
      >
        {children}
      </div>
    </CalendarContext.Provider>
  );
};

export const Calendar = Object.assign(CalendarRoot, {
  Header: CalendarHeader,
  BodyDays: CalendarDays,
  BodyWeeks: CalendarWeeks,
});
