import './Journal.css';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';




function Journal() {
  const [noteRange, setNoteRange] = useState('Today');
  const [notesData, setNotesData] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);


  const navigate = useNavigate();

  const newNote = () => {
    navigate('/journal/new-note');
  };

  const viewNote = (id) => {
      setSelectedNoteId(id);
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


  const notes = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const database = getFirestore();
      const journalCollectionRef = collection(database, 'users', user.uid, 'journal');

      try {
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
          className="note-entry"
          onClick={() => viewNote(note.id)}
        >
            <h3>{note.title}</h3>
            <p>{note.createdAt.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>


      <button className="new-note" onClick={newNote}> + </button>
      <Footer />
    </div>
  );
}

export default Journal;
