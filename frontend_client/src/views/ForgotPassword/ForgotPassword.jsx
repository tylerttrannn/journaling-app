import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPassword.css';

function ForgotPassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const resetPassword = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);
        const auth = getAuth();

        try {
            console.log(payload['email']);
            await sendPasswordResetEmail(auth, payload['email']);
            setSuccessMessage('Password reset email sent successfully.');
        } catch (error) {
            console.log("There was an error attempting to send a reset link", error);
            setErrorMessage('There was an error that occurred, please try again.');
        }
    };

    return (
        <div className="ForgotPassword-page">
            <Link to="/">
                <button className="home-button">Home</button>
            </Link>
            
            <div className="ForgotPassword-container">
                <h1 className="ForgotPassword-title">Forgot Password?</h1>
                <form className="ForgotPassword-form" onSubmit={resetPassword}>
                    <label className="ForgotPassword-label">Please enter your email below</label>
                    <input type="email" name="email" className="ForgotPassword-input" required />

                    <button type="submit" className="ForgotPassword-button">Submit</button>

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
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
