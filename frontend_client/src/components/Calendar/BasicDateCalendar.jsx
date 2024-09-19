import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import { getDocs, collection, query, where, Timestamp } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


/**
 * Fetch journal days for the current user in the selected month
 */
async function fetchJournalDays(date, { signal }) {

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore(); 

  if (!user) {
    console.error("User is not authenticated");
    return { daysToHighlight: [] };
  }
  
  try {
    const daysInMonth = date.daysInMonth();
    const startOfMonth = date.startOf('month').toDate();
    const endOfMonth = date.endOf('month').toDate();
    
    // Query Firestore for journal entries within the current month
    const journalDaysQuery = query(
      collection(database, 'users', user.uid, 'journal'),
      where('createdAt', '>=', startOfMonth),
      where('createdAt', '<=', endOfMonth)
    );

    const snapshot = await getDocs(journalDaysQuery);


    // convering all of the firebase timestamp to a javascript date 
    const daysToHighlight = snapshot.docs.map(doc => {
      const entryDate = doc.data().createdAt;  
      if (entryDate instanceof Timestamp) {
        // Convert Firestore Timestamp to JavaScript Date
        return dayjs(entryDate.toDate()).date();
      }
      return dayjs(entryDate).date();  
    });

    
    return { daysToHighlight };
  } catch (error) {
    console.error("Failed to fetch journal days:", error);
    throw error;
  }
}


// current date 
const initialValue = dayjs();

/* This function renders the additional info (badge) on the selected days */
function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🔴' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}


/* Main Calendar Component */
export default function BasicDateCalendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);



  // Use the actual fetchJournalDays instead of fakeFetch
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fetchJournalDays(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
