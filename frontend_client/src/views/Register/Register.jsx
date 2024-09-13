import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection  } from 'firebase/firestore';

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
    
        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);
    
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
            const userCredential = await createUserWithEmailAndPassword(auth, payload['email'], payload['password']);
            const user = userCredential.user;


            await updateProfile(user, {
                displayName: `${payload['first_name']} ${payload['last_name']}`
            });

    
            // Save additional user info in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstName: payload['first_name'],
                lastName: payload['last_name'],
            });
    
            // Creating a journal subcollection 
            const journalCollectionRef = collection(db, 'users', user.uid, 'journal');
            await setDoc(doc(journalCollectionRef, 'entry1'), {
                title: 'First Journal Entry',
                content: 'This is your first entry!',
                createdAt: new Date()
            });

            // creating a recentely viewed collection 
            const viewedCollectionRef = collection(db, 'users', user.uid, 'viewed');
            await setDoc(doc(viewedCollectionRef, 'viewedDocs'), { 
                recentlyViewed: []  // Initializing an empty array
            });

            

            setSuccessMessage('Registration successful!');
            navigate('/'); // Redirect to the main page
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className = "register-page">
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
        </div>
    );
}

export default Register;
