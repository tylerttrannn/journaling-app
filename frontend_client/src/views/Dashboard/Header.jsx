import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './Header.css';

function Header() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        setUser(user);

        // Fetch user name from Firestore
        try {
          const userDoc = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDoc);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();

            // defaults to 'user' if not set yet 
            setUserName(userData.firstName || 'User'); 
          } else {
            setUserName('User');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserName('User');
        }

      } else {
        // User is signed out
        setUser(null);
        setUserName('');
      }
    });

    // not sure what this does yet 
    return () => unsubscribe();
  }, [auth, db]);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserName('');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="header">
      <h1>Journaling Website!</h1>
      <div className="button-container">
        <button>Profile</button>
        <button>About</button>
        <button>Share</button>
      </div>
      <div className="user-container">
        {user ? (
          <>
            <span>Welcome, {userName}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button>Register</button>
            </Link>

            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
