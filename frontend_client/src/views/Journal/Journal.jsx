import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDocs, collection, deleteDoc, getDoc, updateDoc, query, where, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Journal.css';
import dayjs from 'dayjs';

function Journal() {
  const [notesData, setNotesData] = useState([]);
  const [selectDeleteNote, setSelectDeleteNote] = useState(false);
  const [noteToView, setNoteToView] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [noteRange, setNoteRange] = useState('Today'); // Set default range to 'Today'

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
        const startOfDay = Timestamp.fromDate(now.startOf('day').toDate());
        const endOfDay = Timestamp.fromDate(now.add(1, 'day').startOf('day').toDate());
        journalQuery = query(
          journalRef,
          where('createdAt', '>=', startOfDay),
          where('createdAt', '<', endOfDay)
        );
        break;
      case 'Week':
        const startOfWeek = Timestamp.fromDate(now.startOf('week').toDate());
        const endOfWeek = Timestamp.fromDate(now.add(1, 'week').startOf('week').toDate());
        journalQuery = query(
          journalRef,
          where('createdAt', '>=', startOfWeek),
          where('createdAt', '<', endOfWeek)
        );
        break;
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
      default:
        journalQuery = journalRef;
    }

    try {
      const snapshot = await getDocs(journalQuery);
      const notesList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("NOTES LIST IS ", notesList)
      setNotesData(notesList);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    if (user && noteRange) {
      fetchNotes();
    }
  }, [user, noteRange]);

  // Optionally monitor notesData updates
  useEffect(() => {
    console.log("Updated notesData:", notesData);
  }, [notesData]);

  return (
    <div className="journal-container">
      <Header />
      <Navbar />
      <h1>Journal Entries</h1>

      <div className="Journal">
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
