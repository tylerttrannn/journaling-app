import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {

    const submitForm = async (event) => {
        event.preventDefault();

        // puts all the form data into one object
        // event.target lets us know we are working with the form data 
        const formData = new FormData(event.target);
        // translates into plain js object (which is just in a like json format) 
        const payload = Object.fromEntries(formData);

        if (payload['password'] !== payload['confirm_password']) {
            console.log("Passwords do not match!");
            return;
        }
        
        /** 
        try {
            const response = await fetch('https://localhost:3000/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Network response is not okay");
            }

            const result = await response.json();
            console.log('Success', result);

        } catch (error) {
            console.error('Error', error);
        }
        */
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
                    <input type="text" className="register-input" name="first_name" />

                    <label className="register-label">Last Name:</label>
                    <input type="text" className="register-input" name="last_name" />

                    <label className="register-label">Email:</label>
                    <input type="text" className="register-input" name="email" />

                    <label className="register-label">Password:</label>
                    <input type="password" className="register-input" name="password" />

                    <label className="register-label">Confirm Password:</label>
                    <input type="password" className="register-input" name="confirm_password" />

                    <button type="submit" className="register-button">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Register;
