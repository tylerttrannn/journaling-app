import { getFirestore, doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useState,useEffect } from 'react';


function NoteDetails(){
    
    const [notesData, setNotesData] = useState([]);

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
    

    return(
    <div>

      <div className="notes-content">
        {notesData.map(note => (
          <div
          key={note.id}
          className="note-entry"
          onClick={() => viewNote(note.id)}
        >
            <h1>{note.content}</h1>
          </div>
        ))}
      </div>
    </div>
    )
}


export default NoteDetails 