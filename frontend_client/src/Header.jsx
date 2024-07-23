import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

function Header() {
  const testAPI = () => {
    fetch('http://localhost:5001/api')
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
      });
  };



  return (
    <div className="header">
      <h1>Journaling website!</h1>
      <div className="button-container">
        <button onClick={testAPI}>Profile</button>
        <button>About</button>
        <button>Share</button>
      </div>

      <div className = "user-container">
        <Link to="/register">
          <button>Register</button>
        </Link>

        <button>Login</button>
      </div>
    </div>
  );
}

export default Header;
