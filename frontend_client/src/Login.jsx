import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <>
        <Link to="/">
            <button className = "home-button">Home</button>
        </Link>
        <div className="register-container">
            <h1 className="register-title">Login</h1>
            <form className="register-form">
                <label className="register-label">Email:</label>
                <input type="text" className="register-input" />

                <label className="register-label">Password:</label>
                <input type="password" className="register-input" />
                
                <button type="submit" className="register-button">Submit</button>
            </form>


        </div>
        </>
    );
}

export default Login;
