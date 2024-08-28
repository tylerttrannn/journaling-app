import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Journal.css';

function Journal() {
  const [noteRange, setNoteRange] = useState('Today');
  const [notesData, setNotesData] = useState([]);
  const [selectDeleteNote, setSelectDeleteNote] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();
  const navigate = useNavigate();

  const newNote = () => navigate('/journal/new-note');
  const viewNote = id => navigate(`/journal/note/${id}`);
  const deleteNote = async id => {
    if (user) {
      const docRef = doc(database, 'users', user.uid, 'journal', id);
      try {
        await deleteDoc(docRef);
        setNotesData(prev => prev.filter(note => note.id !== id));
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const journalRef = collection(database, 'users', user.uid, 'journal');
        try {
          const snapshot = await getDocs(journalRef);
          const notesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setNotesData(notesList);
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };
      fetchNotes();
    }
  }, [user]);

  const renderNotes = () => {
    switch (noteRange) {
      case 'Today':
        return <div>Notes from Today</div>;
      case 'Week':
        return <div>Notes from This Week</div>;
      case 'Month':
        return <div>Notes from This Month</div>;
      case 'Year':
        return <div>Notes from This Year</div>;
      default:
        return null;
    }
  };

  return (
    <div className="journal-container">
      <Header />
      
      <h1>Journal Entries</h1>

      <div className="Journal">
        <Navbar />
        <div className="select-note-range">
          {['Today', 'Week', 'Month', 'Year'].map(range => (
            <button key={range} onClick={() => setNoteRange(range)}>
              {range}
            </button>
          ))}
        </div>

        <div className="notes-content">
          {renderNotes()}
          {notesData.map(note => (
            <div
              key={note.id}
              className={`note-entry ${selectDeleteNote ? 'delete-note' : ''}`}
              onClick={() => selectDeleteNote ? deleteNote(note.id) : viewNote(note.id)}
            >
              <h3>{note.title}</h3>
              <p>{new Date(note.createdAt.seconds * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="add-delete">
          <button className="new-note" onClick={newNote}>+</button>
          <button className="delete" onClick={() => setSelectDeleteNote(true)}>Delete</button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Journal;
