import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Journal.css';


function Journal() {
  const [notesData, setNotesData] = useState([]);
  const [selectDeleteNote, setSelectDeleteNote] = useState(false); // Control delete state
  const [noteToDelete, setNoteToDelete] = useState(null); // Store selected note for deletion

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();
  const navigate = useNavigate();

  const newNote = () => navigate('/journal/new-note');
  const viewNote = id => navigate(`/journal/note/${id}`);

  const deleteNote = async () => {
    if (user && noteToDelete) {
      const docRef = doc(database, 'users', user.uid, 'journal', noteToDelete);
      try {
        await deleteDoc(docRef);
        setNotesData(prev => prev.filter(note => note.id !== noteToDelete));
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

  
  return (
    <div className="journal-container">
      <Header />
      <Navbar />
      <h1>Journal Entries</h1>

      <div className="Journal">
        <div className="select-note-range">
          {['Today', 'Week', 'Month', 'Year'].map(range => (
            <button key={range} onClick={() => setNoteRange(range)}>
              {range}
            </button>
          ))}
        </div>

        <div className="notes-content">
          {notesData.map(note => (
            <div
              key={note.id}
              className={`note-entry ${selectDeleteNote ? 'delete-note' : ''}`}
              onClick={() => selectDeleteNote ? setNoteToDelete(note.id) : viewNote(note.id)}
            >

              <h3>{note.title}</h3>
              <p>{new Date(note.createdAt.seconds * 1000).toLocaleString()}</p>

              {/* Render Popup conditionally */}
              {selectDeleteNote && noteToDelete === note.id && (
                // popup definition 
                <Popup
                  isOpen={selectDeleteNote} // Only open if a note is selected for deletion
                  onClose={() => {}} 
                  title="Delete Confirmation"
                  message="Are you sure you want to delete this note?"
                  actions={[
                    { label: 'Yes', onClick: deleteNote },
                    { label: 'No', onClick: () => {
                      setSelectDeleteNote(false);
                      setNoteToDelete(null); // Clear selected note when pressing 'No'
                    }}
                  ]}
                />
              )}
            </div>
          ))}
        </div>

        <div className="add-delete">
          <button className="new-note" onClick={newNote}>Add</button>
          <button className="delete" onClick={() => {
            setNoteToDelete(null); // Reset the note to delete when the delete button is clicked
            setSelectDeleteNote(true);
          }}>Delete</button>
        </div>

      </div>
    </div>
  );
}

export default Journal;
