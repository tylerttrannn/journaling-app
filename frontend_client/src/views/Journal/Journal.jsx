import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDocs, collection, deleteDoc} from 'firebase/firestore';
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

  const newNote = () => {
    navigate('/journal/new-note');
  };

  const viewNote = (id) => {
      navigate(`/journal/note/${id}`);
  }

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

  const deleteNote = async (id) => {
    setSelectDeleteNote(false);

    if (user){
      const documentRef = doc(database, 'users', user.uid, 'journal', id);

      try{
        await deleteDoc(documentRef);
        const updatedNotes = notesData.filter((note) => note.id !== id);
        setNotesData(updatedNotes);

        console.log("Document successfully deleted!");
      }
      catch(error){
        console.log("there was an error that occured", error);
      }

    }

  };
  

  const notes = async () => {
    if (user) {
      const journalCollectionRef = collection(database, 'users', user.uid, 'journal');

      try {
        // this retrives all the documents from the journal collection for that user 
        const snapshot = await getDocs(journalCollectionRef);

        // look at this later 
        const notesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setNotesData(notesList);

      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  // this loads the note data into notesData 
  useEffect(() => {
    notes();
  }, []); // Empty dependency array ensures this runs only once when the component mounts


  return (
    <div className="Journal">
      <Header />
      <Navbar />
      <div className="select-note-range">
        <button onClick={() => setNoteRange('Today')}>Today</button>
        <button onClick={() => setNoteRange('Week')}>Week</button>
        <button onClick={() => setNoteRange('Month')}>Month</button>
        <button onClick={() => setNoteRange('Year')}>Year</button>
      </div>

      <div className="notes-content">
        {renderNotes()}
        {notesData.map(note => (
          <div
          key={note.id}
          className={`note-entry ${ selectDeleteNote ? 'delete-note' : ''}`}  // if selectDeleteNote is true then each note item's class name will change to delete-note 
          onClick={
            selectDeleteNote
              ? () => deleteNote(note.id)  // delete the note if selectDelteNote
              : () => viewNote(note.id)  // view the note otherwise 
          }
        >
          <h3>{note.title}</h3>
          <p>{note.createdAt.toDate().toLocaleString()}</p>
        </div>
      ))}
      </div>

      <button className="new-note" onClick={newNote}> + </button>
      <button className="delete" onClick={() => setSelectDeleteNote(true)}>Delete</button>
      <Footer />
    </div>
  );
}

export default Journal;
