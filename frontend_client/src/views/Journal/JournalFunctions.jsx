import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export const getDateRange = (range) => {
  const now = dayjs();

  let startDate, endDate;

  switch (range) {
    case 'Today':
      startDate = now.startOf('day');
      endDate = now.endOf('day');
      break;
    case 'Week':
      startDate = now.startOf('week');
      endDate = now.endOf('week');
      break;
    case 'Month':
      startDate = now.startOf('month');
      endDate = now.endOf('month');
      break;
    case 'Year':
      startDate = now.startOf('year');
      endDate = now.endOf('year');
      break;
    default:
      startDate = null;
      endDate = null;
      break;
  }

  if (startDate && endDate) {
    return {
      start: Timestamp.fromDate(startDate.toDate()),
      end: Timestamp.fromDate(endDate.toDate()),
    };
  } else {
    return null;
  }
};


export const deleteNote = async (user, noteToDelete) => {
  if (user && noteToDelete) {
    const docRef = doc(database, 'users', user.uid, 'journal', noteToDelete);
    try {
      await deleteDoc(docRef);
      setNotesData((prev) => prev.filter((note) => note.id !== noteToDelete));
      setSelectDeleteNote(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
};

