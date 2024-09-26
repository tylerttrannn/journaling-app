import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sidebarData } from './sidebarData.jsx'; 
import { getAuth, signOut } from "firebase/auth";  
import { useNavigate } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(sidebar);

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sign-out successful.");
            navigate('/');
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    const handleItemClick = (action) => {
        if (action === 'logout') {
            handleSignOut();
        }
    };




    return (
        <>
            <nav className='nav-menu'>
                <ul className='nav-menu-items'>
                    
                    <li className='nav-logo'>
                        <div className='nav-icon'>
                            <IoIcons.IoIosJournal className='app-icon' />
                        </div>
                        <span className='nav-text app-title'>Notely</span>
                    </li>

                    {sidebarData.map((item, index) => (
                    <li key={index} className={item.cName} onClick={() => handleItemClick(item.action)}>
                        <Link to={item.path}>
                            <div className='nav-icon'>{item.icon}</div>
                            <span className='nav-text'>{item.title}</span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
