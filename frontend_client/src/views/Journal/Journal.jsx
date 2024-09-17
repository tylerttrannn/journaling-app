import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDocs, collection, deleteDoc, getDoc, updateDoc, query, where, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FilterData } from './FilterData.jsx';
import './Journal.css';
import dayjs from 'dayjs';

function Journal() {
  const [notesData, setNotesData] = useState([]);
  const [selectDeleteNote, setSelectDeleteNote] = useState(false);
  const [noteToView, setNoteToView] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteRange, setNoteRange] = useState('Today'); // Set default range to 'Today'

  const [renderMonths, setRenderMonths] = useState(null)

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();
  const navigate = useNavigate();
  const newNote = () => navigate('/journal/new-note');

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
        console.error("Error adding note to recently viewed:", error);
      }
    }
  };

  const fetchNotes = async () => {
    if (!user) return;

    const journalRef = collection(database, 'users', user.uid, 'journal');
    let journalQuery;

    const now = dayjs();

    switch (noteRange) {
      case 'Today':
        // leave this the same 
        const startOfDay = Timestamp.fromDate(now.startOf('day').toDate());
        const endOfDay = Timestamp.fromDate(now.add(1, 'day').startOf('day').toDate());
        journalQuery = query(
          journalRef,
          where('createdAt', '>=', startOfDay),
          where('createdAt', '<', endOfDay)
        );
        setRenderMonths(null);
        break;
      case 'Week':
        // we leave this the same 
        const startOfWeek = Timestamp.fromDate(now.startOf('week').toDate());
        const endOfWeek = Timestamp.fromDate(now.add(1, 'week').startOf('week').toDate());
        journalQuery = query(
          journalRef,
          where('createdAt', '>=', startOfWeek),
          where('createdAt', '<', endOfWeek)
        );
        setRenderMonths(null);
        break;

      case 'Month':
        setRenderMonths(true);

      default:
        journalQuery = journalRef;
    }

    try {
      const snapshot = await getDocs(journalQuery);
      const notesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotesData(notesList);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createQuery = (month) => {

    const startOfMonth = Timestamp.fromDate(now.startOf('month').toDate());
    const endOfMonth = Timestamp.fromDate(now.add(1, 'month').startOf('month').toDate());
    journalQuery = query(
      journalRef,
      where('createdAt', '>=', startOfMonth),
      where('createdAt', '<', endOfMonth)
    );
    setRenderMonths(null);

    return journalQuery;

  }

  useEffect(() => {
    if (user && noteRange) {
      fetchNotes();
    }
  }, [user, noteRange]);

  // this is what renders the notes to the users on screen 
  useEffect(() => {
    console.log("Updated notesData:", notesData);
  }, [notesData]);

  return (
    <div className="journal-container">
      <Header />
      <Navbar />
      <h1>Journal Entries</h1>

      <div className="Journal">
        {/* when the user selects a filter eg for month we want to show the months where the notes exist
        and when they press year it has all of the years  */}
        <div className="select-note-range">
          {['Today', 'Week', 'Month', 'Year'].map((range) => (
            <button key={range} onClick={() => setNoteRange(range)}>
              {range}
            </button>
          ))}
        </div>

        <div className="notes-content">
          {notesData.map((note) => (
            <div
              key={note.id}
              className={`note-entry ${selectDeleteNote ? 'delete-note' : ''}`}
              onClick={() =>
                selectDeleteNote ? setNoteToDelete(note.id) : viewNote(note.id)
              }
            >
              <h3>{note.title}</h3>
              <p>{new Date(note.createdAt.seconds * 1000).toLocaleString()}</p>

              {selectDeleteNote && noteToDelete === note.id && (
                <Popup
                  isOpen={selectDeleteNote}
                  onClose={() => {}}
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

            </div>
          ))}
        </div>
          

        {/*when rendered the user can pick which month they want to look through and the app
        will filter out for only that month and likewise for year which goes down to month*/}
        {renderMonths && <div className = "filter-content">
          {FilterData.map((month) => (
            <>
              {/* rendering each monnth */}
              <div
                className={'months-entry'}
                onClick={createQuery(month)}
              >
                {/* month title */}
                <h3>{month.title}</h3>
                
              </div>
            </>
          ))}
        </div>}
       

        <div className="add-delete">
          <button className="new-note" onClick={newNote}>
            Add
          </button>
          <button
            className="delete"
            onClick={() => {
              setNoteToDelete(null);
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



/* 

 case 'Month':
  const startOfMonth = Timestamp.fromDate(now.startOf('month').toDate());
  const endOfMonth = Timestamp.fromDate(now.add(1, 'month').startOf('month').toDate());
  journalQuery = query(
    journalRef,
    where('createdAt', '>=', startOfMonth),
    where('createdAt', '<', endOfMonth)
  );
  break;
case 'Year':
  const startOfYear = Timestamp.fromDate(now.startOf('year').toDate());
  const endOfYear = Timestamp.fromDate(now.add(1, 'year').startOf('year').toDate());
  journalQuery = query(
    journalRef,
    where('createdAt', '>=', startOfYear),
    where('createdAt', '<', endOfYear)
  );
  break;
*/