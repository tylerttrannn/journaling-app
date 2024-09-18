import './Journal.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import { getDateRange } from './JournalFunctions.jsx';

dayjs.extend(localeData);

function Journal() {
  const [notesData, setNotesData] = useState([]);
  const [selectDeleteNote, setSelectDeleteNote] = useState(false);
  const [noteToView, setNoteToView] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const [noteRange, setNoteRange] = useState('Today');
  const [renderMonths, setRenderMonths] = useState(false);
  const [renderYears, setRenderYears] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();
  const navigate = useNavigate();

  const months = dayjs.months();

  const currentYear = dayjs().year();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const newNote = () => navigate('/journal/new-note');

  const handleNoteRangeChange = (range) => {
    setNoteRange(range);
    setNotesData([]); // Clear previous notes data
  
    if (range === 'Month') {
      setRenderMonths(false);
      setRenderYears(false);
      setSelectedMonth(null);
      setSelectedYear(null);
      fetchNotes('Month'); // Fetch notes immediately for current month
    } else if (range === 'Year') {
      setRenderYears(true);
      setRenderMonths(false);
      setSelectedYear(null);
      setSelectedMonth(null);
    } else {
      setRenderMonths(false);
      setRenderYears(false);
      setSelectedMonth(null);
      setSelectedYear(null);
      fetchNotes(range); // Fetch notes immediately for 'Today' and 'Week'
    }
  };
  

  const viewNote = (id) => {
    setNoteToView(id);
  };

  useEffect(() => {
    if (noteToView) {
      modifyRecentlyViewed();
    }
  }, [noteToView]);

  const modifyRecentlyViewed = async () => {
    if (user && noteToView) {
      const docRef = doc(database, 'users', user.uid, 'viewed', 'viewedDocs');

      try {
        const docSnap = await getDoc(docRef);
        let recentlyViewed = [];

        if (docSnap.exists()) {
          recentlyViewed = docSnap.data().recentlyViewed || [];
          const noteIndex = recentlyViewed.indexOf(noteToView);
          if (noteIndex !== -1) {
            recentlyViewed.splice(noteIndex, 1);
          }
          if (recentlyViewed.length >= 4) {
            recentlyViewed.shift();
          }
        }

        recentlyViewed.push(noteToView);

        await updateDoc(docRef, { recentlyViewed });
        navigate(`/journal/note/${noteToView}`);
        setNoteToView(null);
      } catch (error) {
        console.error('Error adding note to recently viewed:', error);
      }
    }
  };

  const deleteNote = async () => {
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

  const fetchNotes = async (range, monthIndex = null, year = null) => {
    if (!user) return;
    const journalRef = collection(database, 'users', user.uid, 'journal');
    let journalQuery;
  
    let startDate, endDate;
  
    if (range === 'Today' || range === 'Week') {
      const dateRange = getDateRange(range);
      startDate = dateRange.start;
      endDate = dateRange.end;
    } else if (range === 'Month') {
      // Fetch notes for current month
      const now = dayjs();
      startDate = Timestamp.fromDate(now.startOf('month').toDate());
      endDate = Timestamp.fromDate(now.endOf('month').toDate());
    } 
    else if (range === 'Year' && year !== null) {
      if (monthIndex !== null) {
        // Both year and month are selected
        startDate = Timestamp.fromDate(
          dayjs().year(year).month(monthIndex).startOf('month').toDate()
        );
        endDate = Timestamp.fromDate(
          dayjs().year(year).month(monthIndex).endOf('month').toDate()
        );
      } else {
        // Only year is selected
        startDate = Timestamp.fromDate(dayjs().year(year).startOf('year').toDate());
        endDate = Timestamp.fromDate(dayjs().year(year).endOf('year').toDate());
      }
    }
    else {
      // Handle cases where date range is not specified properly
      console.error('Invalid date range specified.');
      return;
    }
  
    journalQuery = query(
      journalRef,
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate)
    );
  
    try {
      const snapshot = await getDocs(journalQuery);
      const notesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotesData(notesList);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
  
  // Fetch notes when component mounts or user changes
  useEffect(() => {
    if (user && (noteRange === 'Today' || noteRange === 'Week')) {
      fetchNotes(noteRange);
    }
  }, [user, noteRange]);







  return (
    <div className="journal-container">
      <Header />
      <Navbar />

      <div className="Journal">
        <h1>Journal Entries</h1>

        <div className="select-note-range">
          {['Today', 'Week', 'Month', 'Year'].map((range) => (
            <button key={range} onClick={() => handleNoteRangeChange(range)}>
              {range}
            </button>
          ))}
        </div>

        {/* Render years when 'Year' is selected */}
        {renderYears && selectedYear === null && noteRange === 'Year' && (
          <div className="filter-content-years">
            {years.map((year) => (
              <div
                key={year}
                className="years-entry"
                onClick={() => {
                  setSelectedYear(year);
                  setRenderMonths(true);
                }}
              >
                <h3 className = "years-container">{year}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Render months after year is selected */}
        {renderMonths && selectedMonth === null && selectedYear !== null && noteRange === 'Year' && (
          <div className="filter-content">
            {months.map((monthName, index) => (
              <div
                key={index}
                className="months-entry"
                onClick={() => {
                  setSelectedMonth(index);
                  fetchNotes('Year', index, selectedYear);
                  setRenderMonths(false); 
                  setRenderYears(false);  
                }}
              >
                <h3>{monthName}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Display selected month and year */}
        {selectedYear !== null && selectedMonth !== null && noteRange === 'Year' && (
          <h2>
            Notes for {months[selectedMonth]} {selectedYear}
          </h2>
        )}
        {selectedYear !== null && selectedMonth === null && noteRange === 'Year' && (
          <h2>Notes for {selectedYear}</h2>
        )}

        <div className="notes-content">
          {notesData.length > 0 ? (
            notesData.map((note) => (
              <div
                key={note.id}
                className={`note-entry ${selectDeleteNote ? 'delete-note' : ''}`}
                onClick={() =>
                  selectDeleteNote ? setNoteToDelete(note.id) : viewNote(note.id)
                }
              >
                <h3>{note.title}</h3>
                <p>{new Date(note.createdAt.seconds * 1000).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No notes available for the selected period.</p>
          )}
        </div>

        {/* Popup for deleting notes */}
        {selectDeleteNote && noteToDelete && (
          <Popup
            isOpen={selectDeleteNote}
            onClose={() => {
              setSelectDeleteNote(false);
              setNoteToDelete(null);
            }}
            title="Delete Confirmation"
            message="Are you sure you want to delete this note?"
            actions={[
              { label: 'Yes', onClick: deleteNote },
              {
                label: 'No',
                onClick: () => {
                  setSelectDeleteNote(false);
                  setNoteToDelete(null);
                },
              },
            ]}
          />
        )}

        <div className="add-delete">
          <button className="new-note" onClick={newNote}>
            Add
          </button>
          <button
            className="delete"
            onClick={() => {
              setSelectDeleteNote(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Journal;
