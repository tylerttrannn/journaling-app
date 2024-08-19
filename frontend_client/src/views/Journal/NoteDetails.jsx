import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function NoteDetails() {
  // get id from user 

  const params = useParams(); 
  const id = params.noteId;
  const [note, setNote] = useState(null);

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
            setNote({
              id: noteSnapshot.id,
              ...noteSnapshot.data()
            });
          } 

          else {
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
  }, [id]); // fetch the note whenever the id changes

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="NoteDetails">
      <h2>{note.title}</h2>
      <p>{note.createdAt.toDate().toLocaleString()}</p>
      <div>{note.content}</div>
    </div>
  );
}

export default NoteDetails;
