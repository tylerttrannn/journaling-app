import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import './Login.css';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const verifyInfo = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(
        auth,
        payload['email'],
        payload['password']
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
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
          <input
            type="text"
            name="email"
            className="login-input"
            required
          />

          <label className="login-label">Password:</label>
          <input
            type="password"
            name="password"
            className="login-input"
            required
          />

          <button type="submit" className="login-button">
            Submit
          </button>
        </form>

        {/* Google Sign-In Button */}
        <button onClick={handleGoogleSignIn} className="google-sign-in-button">
          Sign in with Google
        </button>

        {errorMessage && (
          <div className="error">
            <p className="error-message">{errorMessage}</p>
          </div>
        )}

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
