import { useState, useEffect } from 'react';
import './Notes.css';

function Notes() {
    const [text, setText] = useState('');
    const [isVisible, setVisible] = useState(true);
    const [notes, setNotes] = useState([]);
    const [showPastNotes, setShowPastNotes] = useState(false);

    // Load notes from localStorage when the component mounts
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    // Save notes to localStorage whenever the notes state changes
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    
    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        const currentDate = new Date().toLocaleDateString();
        const newNote = {
            date: currentDate,
            text: text
        };

        // Add the new note to the list of notes
        setNotes([...notes, newNote]);
        clearSubmit();
        setVisible(false);

        console.log("Note saved!", newNote);
    };

    const clearSubmit = () => {
        setText("");
    };

    const newNote = () => {
        setVisible(true);
        setShowPastNotes(false);  // Hide past notes when creating a new note
    };

    const togglePastNotes = () => {
        setShowPastNotes(!showPastNotes);
        setVisible(false);  // Hide new note form when showing past notes
    };

    return (
        <div>
            <br/>
            {isVisible && !showPastNotes && (
                <>
                    <br/>
                    <label className="label" htmlFor="freeform">Write about your day so far!</label>
                    <br/>
                    <textarea
                        id="freeform"
                        value={text}
                        onChange={handleChange}
                        className="static-textarea"
                    />
                    <br/>
                    <button className="submit" onClick={handleSubmit}> Submit</button>
                    <button className="clear" onClick={clearSubmit}> Clear</button>
                    <button className="pastNotes" onClick={togglePastNotes}> Past Notes</button>
                </>
            )}

            {!isVisible && !showPastNotes && (
                <>
                    <h2> Submitted!</h2>
                    <button className="newNote" onClick={newNote}> New Note</button>
                    <button className="pastNotes" onClick={togglePastNotes}> Past Notes</button>
                </>
            )}

            {showPastNotes && (
                <div className="pastNotesContainer">
                    <h2>Past Notes</h2>
                    <ul>
                        {notes.map((note, index) => (
                            <li key={index}>
                                <strong>{note.date}:</strong> {note.text}
                            </li>
                        ))}
                    </ul>
                    <button className="newNote" onClick={newNote}> New Note</button>
                </div>
            )}
        </div>
    );
}

export default Notes;
