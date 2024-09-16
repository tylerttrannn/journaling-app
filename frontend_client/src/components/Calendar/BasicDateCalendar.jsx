import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

export default function BasicDateCalendar() {
  const initialValue = dayjs(); // Default value for the calendar
  const isLoading = false; // Set to false if no loading is needed

  // Placeholder for month change handler
  const handleMonthChange = (newMonth) => {
    console.log('Month changed to:', newMonth);
  };

  return (
    <div className="DateCalendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          onMonthChange={handleMonthChange}
        />
      </LocalizationProvider>
    </div>
  );
}
