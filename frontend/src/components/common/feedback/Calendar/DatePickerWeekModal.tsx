import { Calendar } from './Calendar';

interface DatePickerWeekModalProps {
  className?: string;
  completedDates?: string[];
}

const DatePickerWeekModal = ({ className = '', completedDates = [] }: DatePickerWeekModalProps) => {
  return (
    <Calendar variant="modal" className={className}>
      <Calendar.BodyWeeks completedDates={completedDates} />
    </Calendar>
  );
};

export default DatePickerWeekModal;
