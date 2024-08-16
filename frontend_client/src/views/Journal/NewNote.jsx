import './Journal.css';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const submitEntry = () => {
    const text_area = document.getElementById("entry").value;
    console.log(text_area);
}

function NewNote() {
  const navigate = useNavigate();
  return (
    <div className="Journal">
      <Header />
      <Navbar />
      <label for="">Enter your entry!:</label>
      <textarea id="entry" name="entry-text" rows="10" cols="50"></textarea>
      <button onClick = {submitEntry}>Submit</button>

      <br/><br/><br/><br/><br/><br/><br/>
      <Footer />
    </div>
  );
}

export default NewNote;
