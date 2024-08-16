import './Header.css';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

function Header() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        console.log(user);

        if (user) {
            setUserName(user.displayName);
        } else {
            setUserName('Guest');
        }

        
    }, []);

    return (
        <div className="journal-header">
            <img src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="React Image" />
            <p>Welcome {userName}!</p>
        </div>
    );
}

export default Header;
