import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

function NoteDetails() {
  const params = useParams(); 
  const id = params.noteId;

  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [edit, setEdit] = useState(false);




  useEffect(() => {
    const fetchNote = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const database = getFirestore();
        const noteRef = doc(database, 'users', user.uid, 'journal', id);

        try {
          const noteSnapshot = await getDoc(noteRef);

          if (noteSnapshot.exists()) {
            const noteData = noteSnapshot.data();
            setNote({
              id: noteSnapshot.id,
              ...noteData
            });
            setTitle(noteData.title);
            setEntry(noteData.content);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      } else {
        console.error("User is not authenticated");
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  const modifyNote = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const database = getFirestore();
    const noteRef = doc(database, 'users', user.uid, 'journal', id);


    await updateDoc(noteRef, {
      content: entry,
      title: title
    })
 
    setEdit(false);
    navigate('/journal');

  }

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="NoteDetails">

        {edit ? (
          <>
            <input
              id="title"
              name="title-text"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              id="entry"
              name="entry-text"
              rows="10"
              cols="50"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            ></textarea>
            <button onClick={modifyNote}>Save</button>

          </>
          // other condition is set here if edit is not true 
        ) :(
          <>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => setEdit(true)}>Edit</button>
          </>
        )}


      </div>
    </>
  );
}

export default NoteDetails;
