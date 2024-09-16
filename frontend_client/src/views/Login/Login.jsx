import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const verifyInfo = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, payload['email'], payload['password']);
            navigate('/journal');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="login-page">


            <Link to="/">
                <button className="home-button">Home</button>
            </Link>
            
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={verifyInfo}>
                    <label className="login-label">Email:</label>
                    <input type="text" name="email" className="login-input" required />

                    <label className="login-label">Password:</label>
                    <input type="password" name="password" className="login-input" required />

                    <button type="submit" className="login-button">Submit</button>


                    {errorMessage && (
                        <div className="error">
                            <p className="error-message">{errorMessage}</p>
                        </div>
                    )}
                </form>

                <div className="forgot-password">
                    <a href="/forgot-password" >Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
