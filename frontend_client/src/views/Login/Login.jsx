import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const verifyInfo = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, payload['email'], payload['password']);
            setSuccessMessage('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Link to="/">
                <button className="home-button">Home</button>
            </Link>
            <div className="register-container">
                <h1 className="register-title">Login</h1>
                <form className="register-form" onSubmit={verifyInfo}>
                    <label className="register-label">Email:</label>
                    <input type="text" name="email" className="register-input" required />

                    <label className="register-label">Password:</label>
                    <input type="password" name="password" className="register-input" required />
                    
                    <button type="submit" className="register-button">Submit</button>
                </form>
            </div>
            <label>Forgot Password?</label>


            {errorMessage && (
                <div className="error">
                    <p className="error-message">{errorMessage}</p>
                </div>
            )}

            {successMessage && (
                <div className="success">
                    <p className="success-message">{successMessage}</p>
                </div>
            )}


        </>
    );
}

export default Login;
