import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const verifyInfo = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);

        } catch (error) {
            console.error('Error:', error);
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
                    <input type="text" name="email" />

                    <label className="register-label">Password:</label>
                    <input type="password" name="password" />
                    
                    <button type="submit" className="register-button">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Login;
