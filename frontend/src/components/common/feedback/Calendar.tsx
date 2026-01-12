import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      dateFormat='yyyy.MM.dd' // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
      maxDate={new Date()} // maxDate 이후 날짜 선택 불가
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
    />
  );
};