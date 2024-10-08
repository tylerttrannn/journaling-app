import React from 'react'
import { Button } from 'semantic-ui-react'
import './Header.css';
import { Link } from 'react-router-dom';


function Header(){
    return(
        <div className="header-container">

            <div className = "title-image">
                <h1> Journa</h1>
            </div>



            <div className = "user-action">
                <Link to="/login">
                    <Button primary>Login</Button>
                </Link>
                <Link to="/register">
                    <Button secondary>Register</Button>
                </Link>
            </div>
            
        </div>
    )
}

export default Header;
