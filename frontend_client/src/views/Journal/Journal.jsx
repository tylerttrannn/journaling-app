import './Journal.css';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Journal() {
  const [noteRange, setNoteRange] = useState('Today');
  const navigate = useNavigate();

  const newNote = () => {
    navigate('/journal/new-note');
  };

  const renderNotes = () => {
    switch (noteRange) {
      case 'Today':
        return <div>Notes from Today</div>;
      case 'Week':
        return <div>Notes from This Week</div>;
      case 'Month':
        return <div>Notes from This Month</div>;
      case 'Year':
        return <div>Notes from This Year</div>;
      default:
        return null;
    }
  };

  return (
    <div className="Journal">
      <Header />
      <Navbar />
      <div className="select-note-range">
        <button onClick={() => setNoteRange('Today')}>Today</button>
        <button onClick={() => setNoteRange('Week')}>Week</button>
        <button onClick={() => setNoteRange('Month')}>Month</button>
        <button onClick={() => setNoteRange('Year')}>Year</button>
      </div>

      <div className="notes-content">
        {renderNotes()}
      </div>


      <button className="new-note" onClick={newNote}> + </button>

      <Footer />
    </div>
  );
}

export default Journal;
