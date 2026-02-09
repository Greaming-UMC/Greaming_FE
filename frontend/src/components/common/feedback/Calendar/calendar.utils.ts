export const MIN_VIEW_DATE = new Date(2026, 0, 1);

export const clampMinDate = (date: Date) => (date < MIN_VIEW_DATE ? MIN_VIEW_DATE : date);

export const isMinMonth = (date: Date) =>
  date.getFullYear() === MIN_VIEW_DATE.getFullYear() &&
  date.getMonth() === MIN_VIEW_DATE.getMonth();

export const getWeeksInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const weekStartsOn = 1;
  const firstDayOffset = (first.getDay() + 7 - weekStartsOn) % 7;
  const daysInMonth = last.getDate();
  return Math.ceil((firstDayOffset + daysInMonth) / 7);
};

export const getWeekIndexInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const weekStartsOn = 1;
  const firstDayOffset = (first.getDay() + 7 - weekStartsOn) % 7;
  return Math.floor((firstDayOffset + (date.getDate() - 1)) / 7);
};
