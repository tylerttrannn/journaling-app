import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './NoteDetails.css';
import Tiptap from '../../components/Tiptap/Tiptap.jsx';


import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

function NoteDetails() {
  const params = useParams();
  const id = params.noteId;
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');
  const [edit, setEdit] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const database = getFirestore();

  useEffect(() => {
    const fetchNote = async () => {
      if (user) {
        const noteRef = doc(database, 'users', user.uid, 'journal', id);
        try {
          const noteSnapshot = await getDoc(noteRef);

          if (noteSnapshot.exists()) {
            const noteData = noteSnapshot.data();
            setNote({
              id: noteSnapshot.id,
              ...noteData,
            });
            setTitle(noteData.title);
            setEntry(noteData.content);
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching note:', error);
        }
      } else {
        console.error('User is not authenticated');
      }
    };

    fetchNote();
  }, [id]);

  // iniitalizing the editor 
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: entry,  // setting the content with the data we retrieved from earlier 
    editable: edit, // setting to read only mode 
  });

  // update when the entry changes
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(entry);
    }
  }, [editor, entry]);

  if (!note) {
    return <div>Loading...</div>;
  }

  const modifyNote = async () => {
    const noteRef = doc(database, 'users', user.uid, 'journal', id);
    await updateDoc(noteRef, {
      content: entry,
      title: title,
    });

    setEdit(false);
    navigate('/journal');
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="note-details-container">
        {edit ? (
          <div className="note-details-content">
            <div className="note-details-form">
              <label htmlFor="title" className="form-label">
                Title:
              </label>

              <label htmlFor="entry" className="form-label">
                Entry:
              </label>
              <div className="card">
                {/* Pass setEntry to Tiptap to update the state */}
                <Tiptap setEntry={setEntry} content={entry} />
              </div>



              
              <button onClick={modifyNote} className="form-submit-button">
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-view-mode">
            <div className="text-container">
              <h2>{note.title}</h2>
              {/* Render Tiptap EditorContent here */}
              <EditorContent editor={editor} />
            </div>
            <button onClick={() => setEdit(true)}>Edit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default NoteDetails;
