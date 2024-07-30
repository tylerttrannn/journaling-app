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

        // verifying if the email is in a common format 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(payload['email'])) {
            console.log("Invalid email format!");
            return;
        }

        if (payload['password'] !== payload['confirm_password']) {
            console.log("Passwords do not match!");
            return;
        }

        try {
            // Convert the payload object (data) to a JSON string
            const data = JSON.stringify(payload);
            const verifyUniqueEmail = await fetch(`http://localhost:3000/check-existing-user?email=${encodeURIComponent(payload['email'])}`, {
                headers: {
                    'Content-Type': 'application/json', // Content-Type header is optional for GET requests
                },
            }); 

            const not_unique_email = await verifyUniqueEmail.json();

            if(not_unique_email){
                console.log("this email has been used before to register already!");
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

            // console log 
            const result = await response.json();
            console.log('Success', result); 
        
        } catch (error) {

            console.error('Error', error)
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
