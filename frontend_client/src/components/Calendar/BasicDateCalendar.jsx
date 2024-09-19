import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import { getDocs, collection, query, where, orderBy, Timestamp } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Function to calculate the journal streak for the current user
 */
async function calculateStreak() {
  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();

  if (!user) {
    console.error("User is not authenticated");
    return 0;
  }

  try {
    const journalQuery = query(
      collection(database, 'users', user.uid, 'journal'),
      orderBy('createdAt', 'desc')  // Sorting entries by date in descending order
    );

    const snapshot = await getDocs(journalQuery);

    // Convert all Firebase Timestamps to dayjs-compatible dates
    const journalEntries = snapshot.docs.map(doc => {
      const entryDate = doc.data().createdAt;
      if (entryDate instanceof Timestamp) {
        return dayjs(entryDate.toDate());
      }
      return dayjs(entryDate); // If it's already a JS date or string
    });

    let streak = 0;
    let currentDate = dayjs();

    for (let i = 0; i < journalEntries.length; i++) {
      const entryDate = journalEntries[i];

      // If the entry date is exactly one day before the current date, continue the streak
      if (entryDate.isSame(currentDate, 'day')) {
        streak++; // Continue the streak
        currentDate = currentDate.subtract(1, 'day'); // Move the reference date to the previous day
      } else if (entryDate.isBefore(currentDate, 'day')) {
        // If the date is not consecutive, break the streak
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error("Failed to calculate streak:", error);
    return 0;
  }
}

/* Main Calendar Component */
export default function BasicDateCalendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [streak, setStreak] = React.useState(0);  

  const initialValue = dayjs();

  // Fetch highlighted days
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fetchJournalDays(date, { signal: controller.signal })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      });

    requestAbortController.current = controller;
  };

  // Fetch streak on component mount
  React.useEffect(() => {
    const fetchStreak = async () => {
      const userStreak = await calculateStreak();  // Fetch the streak
      setStreak(userStreak);  // Update state with streak value
    };
    fetchStreak();

    fetchHighlightedDays(initialValue);
    
    // Abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
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
      <h3>You're on a {streak} day streak!</h3> {/* Display the streak */}
    </LocalizationProvider>
  );
}

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
    const startOfMonth = date.startOf('month').toDate();
    const endOfMonth = date.endOf('month').toDate();
    
    const journalDaysQuery = query(
      collection(database, 'users', user.uid, 'journal'),
      where('createdAt', '>=', startOfMonth),
      where('createdAt', '<=', endOfMonth)
    );

    const snapshot = await getDocs(journalDaysQuery);

    const daysToHighlight = snapshot.docs.map(doc => {
      const entryDate = doc.data().createdAt;  
      if (entryDate instanceof Timestamp) {
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
