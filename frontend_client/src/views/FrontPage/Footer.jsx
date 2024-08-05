import React from 'react'
import { Button } from 'semantic-ui-react'
import './Footer.css';
import { Link } from 'react-router-dom';


function Footer(){
    return(
        <div className="footer-container">
            <img src= "./assets/journaling-icon.png"></img>
            <h1> Insert App Name Here</h1>
            <p> Home</p>
            <p> About</p>
            <p> Contact</p>

            <Link to="/login">
                <Button primary>Login</Button>
            </Link>
            <Link to="/register">
            <Button secondary>Register</Button>
            </Link>
            
        </div>
    )
}

export default Footer;
