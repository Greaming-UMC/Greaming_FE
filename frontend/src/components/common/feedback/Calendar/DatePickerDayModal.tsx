import { Calendar } from './Calendar';

interface DatePickerDayModalProps {
  className?: string;
  completedDates?: string[];
}

const DatePickerDayModal = ({ className = '', completedDates = [] }: DatePickerDayModalProps) => {
  return (
    <Calendar variant="modal" className={className}>
      <Calendar.BodyDays completedDates={completedDates} />
    </Calendar>
  );
};

export default DatePickerDayModal;
