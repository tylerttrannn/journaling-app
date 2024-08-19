import './Journal.css';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import './NewNote.css'

const NewNote = () => {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const navigate = useNavigate();

  const submitEntry = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const database = getFirestore();

      try {
        // Reference to the user's journal collection
        const journalCollectionRef = collection(database, 'users', user.uid, 'journal');

        // Create a new document with an auto-generated ID
        const newDocRef = doc(journalCollectionRef);

        // Set the document with the provided title, content, and timestamp
        await setDoc(newDocRef, {
          title: title,
          content: entry,
          createdAt: new Date(),
        });

        console.log('Entry successfully added with ID: ', newDocRef.id);

        // Navigate to a different page (e.g., home or journal page) after submission
        navigate('/journal');

      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div className="Journal">
      <Header />
      <Navbar />
      <label htmlFor="title">Enter your title:</label>
      <input
        id="title"
        name="title-text"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="entry">Enter your entry:</label>
      <textarea
        id="entry"
        name="entry-text"
        rows="10"
        cols="50"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      ></textarea>
      <button onClick={submitEntry}>Submit</button>
      <Footer />
    </div>
  );
};

export default NewNote;
