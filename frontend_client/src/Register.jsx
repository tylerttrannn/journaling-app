import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSucessMessage] = useState('')

    const submitForm = async (event) => {
        event.preventDefault();
        setErrorMessage(''); // Clear any previous error messages
        setSucessMessage('');

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
            // Convert the payload object (data) to a JSON string
            const data = JSON.stringify(payload);
            // using get method to retrive inforamtion if this email exists 
            const verifyUniqueEmail = await fetch(`http://localhost:3000/check-existing-user?email=${encodeURIComponent(payload['email'])}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Content-Type header is optional for GET requests
                },
            }); 

            const not_unique_email = await verifyUniqueEmail.json();

            if(not_unique_email){
                setErrorMessage('This email has already been used to register!');
                return; 
            }
            
            // Make an API call to the endpoint 'http://localhost:3000/add-user'
            const response = await fetch('http://localhost:3000/add-user', {
                method: 'POST', // specify it is a post request 
                headers: {
                    'Content-Type': 'application/json', // specifying the content type is json format
                },
                body: data, // Include the JSON in the request body 
            });

            // if nothing is raised registeration has been sucessful 
            setSucessMessage('Sucess!')
        
        } catch (error) {
            console.error('Error', error)
            setErrorMessage('An error occurred while processing your request.');
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

            {succesMessage && (
                <div className="success">
                    <p className="success-message">{succesMessage}</p>
                </div>
            )}



        </>
    );
}

export default Register;
