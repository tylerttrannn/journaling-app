import { useState, useEffect } from 'react';
import './PastNotes.css';

function PastNotes() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    return (
        <div className="notes">
            <h2>Past Notes:</h2>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        <strong>{note.date}:</strong> {note.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PastNotes;
