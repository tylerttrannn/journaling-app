import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Popup from '../../components/Popup/Popup.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDocs, collection, deleteDoc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Journal.css';


function Journal() {
  const [notesData, setNotesData] = useState([]);
  const [selectDeleteNote, setSelectDeleteNote] = useState(false); // Control delete state
  const [noteToView, setNoteToView] = useState(null); // Store selected note for deletion

  const [noteToDelete, setNoteToDelete] = useState(null); // Store selected note for deletion

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();
  const navigate = useNavigate();

  const newNote = () => navigate('/journal/new-note');

  const viewNote = async (id) => {
    setNoteToView(id);
  };
  
  useEffect(() => {
    if (noteToView) {
      modifyRecentlyViewed();
    }
  }, [noteToView]);
  
  const modifyRecentlyViewed = async () => {
    if (user && noteToView) {
      console.log("Modifying recently viewed notes...");
  
      const docRef = doc(database, 'users', user.uid, 'viewed', 'viewedDocs');
      
      try {
        const docSnap = await getDoc(docRef);
  
        let recentlyViewed = [];
  
        if (docSnap.exists()) {
          recentlyViewed = docSnap.data().recentlyViewed || [];
          
          const noteIndex = recentlyViewed.indexOf(noteToView);
          if (noteIndex !== -1) {
            recentlyViewed.splice(noteIndex, 1); // Remove from current position
          }
          
          if (recentlyViewed.length >= 4) {
            recentlyViewed.shift(); // Remove oldest
          }
        }
  
        recentlyViewed.push(noteToView);
  
        // Update Firestore with modified array
        await updateDoc(docRef, { recentlyViewed });
  
        console.log("Note successfully added to recently viewed.");
  


        // Navigate after updating recently viewed notes
        navigate(`/journal/note/${noteToView}`);
        setNoteToView(null);
      } catch (error) {
        console.error("Error adding note to recently viewed:", error);
      }
    }
  };
  
  

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
