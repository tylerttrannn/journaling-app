import { useState, useEffect } from 'react';
import './Notes.css';

function Notes() {
    const [text, setText] = useState('');
    const [isVisible, setVisible] = useState(true);
    const [notes, setNotes] = useState([]);

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
    };

    return (
        <div className = 'note-area'>
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
        </div>
    );
}



export default Notes;
