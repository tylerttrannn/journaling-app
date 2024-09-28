import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Header from '../../components/Header/Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './NoteDetails.css';
import Tiptap from '../../components/Tiptap/Tiptap.jsx';
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'


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
      TextAlign.configure({
        types: ['heading', 'paragraph'], 
      }),
      Image,


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
    <div className = "note-details-page"> 
      <Header />
      <Navbar />
      <div className="note-details-container">
        {edit ? (
          <div className="note-details-content">
            <div className="note-details-form">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
              id="title"
              name="title-text"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />

              <label htmlFor="entry" className="form-label">
                Entry:
              </label>
              <div className="card">

              {/* 
                setEntry is a function passed from the parent component (NoteDetails) to Tiptap.
                  - Purpose: It allows Tiptap to update the `entry` state in NoteDetails whenever the editor content changes.
                  - How it works: Whenever the user types or modifies content in the editor, Tiptap calls `setEntry` with the new content.
                - `content`: This prop initializes the editor with the current note content from the `entry` state in NoteDetails.
                - Data Flow:
                  - From NoteDetails to Tiptap: The current content (`entry`) is passed down to initialize the editor.
                  - From Tiptap to NoteDetails: Updated content is sent back via `setEntry` whenever the user makes changes.
              */}
              <Tiptap setEntry={setEntry} content={entry}/>
            </div>


              <button onClick={modifyNote} className="form-submit-button">
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-view-mode">
            <div className="text-container">
              <h2 className = "text-view-h2">{note.title}</h2>

              <div className = "text-view-card"> 
                <EditorContent editor={editor} />
              </div>

            </div>
            <button onClick={() => setEdit(true)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteDetails;
