import './Journal.css';
import './NewNote.css';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, collection, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Tiptap from '../../components/Tiptap/Tiptap.jsx';

const NewNote = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState(''); // Entry will store Tiptap content
  const navigate = useNavigate();

  const submitEntry = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const database = getFirestore();

      try {
        const journalCollectionRef = collection(database, 'users', user.uid, 'journal');
        const newDocRef = doc(journalCollectionRef);

        // Use Firestore Timestamp
        await setDoc(newDocRef, {
          title: title,
          content: entry, 
          createdAt: Timestamp.now(),
        });

        console.log('Entry successfully added with ID: ', newDocRef.id);
        navigate('/journal');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div className="new-note-page">
      <Header />
      <Navbar />
      <div className="card">
        {/* Pass setEntry to Tiptap to update the state */}
        <Tiptap setEntry={setEntry} content={entry} />
      </div>

      <div className="note-inputs">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Note Title" 
        />
        <button onClick={submitEntry}>Save Note</button>
      </div>
    </div>
  );
};

export default NewNote;
