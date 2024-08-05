import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './Register.css';

function Register() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const auth = getAuth();
    const db = getFirestore();

    const submitForm = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
        setSuccessMessage('');

        // puts all the form data into one object
        const formData = new FormData(event.target);
        // translates into plain js object (which is just in a like json format) 
        const payload = Object.fromEntries(formData);

        // verifying if the email is in a common format 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload['email'])) {
            setErrorMessage('Invalid email format!');
            return;
        }

        if (payload['password'] !== payload['confirm_password']) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, payload['email'], payload['password']);
            const user = userCredential.user;

            // Save additional user info in Firestore

            
            await setDoc(doc(db, 'users', user.uid), {
                firstName: payload['first_name'],
                lastName: payload['last_name'],
                email: payload['email']
            });

            setSuccessMessage('Registration successful!');
            navigate('/'); // Redirect to the main page
        } catch (error) {
            // Handle Firebase errors
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Link to="/">
                <button className="home-button">Home</button>
            </Link>

            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <form className="register-form" onSubmit={submitForm}>
                    <label className="register-label">First Name:</label>
                    <input type="text" className="register-input" name="first_name" required />

                    <label className="register-label">Last Name:</label>
                    <input type="text" className="register-input" name="last_name" required />

                    <label className="register-label">Email:</label>
                    <input type="text" className="register-input" name="email" required />

                    <label className="register-label">Password:</label>
                    <input type="password" className="register-input" name="password" required />

                    <label className="register-label">Confirm Password:</label>
                    <input type="password" className="register-input" name="confirm_password" required />

                    <button type="submit" className="register-button">Submit</button>
                </form>
            </div>

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

export default Register;
