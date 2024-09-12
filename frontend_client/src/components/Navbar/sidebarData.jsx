import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { TbLogout } from "react-icons/tb";  


// cname = classname 
export const sidebarData = [
   
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Journal',
        path: '/journal',
        icon: <IoIcons.IoIosJournal />,
        cName: 'nav-text'
    },

    {
        title: 'Settings',
        path: '/settings',
        icon: <IoIcons.IoMdSettings />,
        cName: 'nav-text'
    },

    {
        title: 'Logout',           
        path: '#',
        icon: <TbLogout />,       
        cName: 'nav-text',
        action: 'logout'
    }


];
