import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { sidebarData } from './sidebarData.jsx';  // Ensure the path is correct


import './Navbar.css';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={showSidebar} />
                </Link>
            </div>

            {/*this nav will take on two different class names depending on if 
            the user clicked on the menu or not to activate different styling 
            (to expand the navbar or not) */}

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </Link>
                    </li>

                    {/* for each elemenet in the sidebarData a anonymous function (lambda functions basically )
                     returns a rendered component with the icon + title name with the link */}
                    {sidebarData.map((item, index) => (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}


                </ul>
            </nav>
        </>
    );
}

export default Navbar;
