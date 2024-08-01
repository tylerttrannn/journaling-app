import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

    const [errorMessage, setErrorMessage] = useState('');
    const [succesMessage, setSucessMessage] = useState('');


    const verifyInfo = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSucessMessage('');

        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // data is in format {username: tyler, password: password}
                body: JSON.stringify(payload),
            });
            
            const loginResponse = await response.json();

            if(loginResponse['error']){
                setErrorMessage(loginResponse['error']);
            }

            if(loginResponse['success']){
                setSucessMessage(loginResponse['success']);
            }


        } catch (error) {
            console.error('Erasdasdror:', error);
            setErrorMessage(error);
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
                    <input type="text" name="email" className = "register-input" required />

                    <label className="register-label">Password:</label>
                    <input type="password" name="password" className = "register-input" required />
                    
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

export default Login;
