import { createContext, useContext } from 'react';

export type CalendarVariant = 'modal' | 'inline';

export interface CalendarContextType {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  variant: CalendarVariant;
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('Calendar 내부에서 사용하세요.');
  return context;
};
