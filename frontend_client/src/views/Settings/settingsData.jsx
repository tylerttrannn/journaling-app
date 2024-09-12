import React from 'react';

// cname = classname 
export const settingsData = [
   
    // START OF MY ACCOUNT SETTINGS 
    {
        title: 'Email',
        text: '',
        icon: <AiIcons.AiFillHome />,
        cName: 'settings-text',
        action: 'changeEmail'

    },

    {
        title: 'Password',
        text: 'Set a permanent password to login to your account ',
        icon: <IoIcons.IoIosJournal />,
        cName: 'settings-text',
        action: 'setPassword'
    },

    {
        title: '2-Step verification',
        text: 'Add an additional layer of security to your account during login',
        icon: <IoIcons.IoIosPhotos />,
        cName: 'settings-text',
        action: 'setVerification'

    },
    {
        title: 'Delete my account',
        text: 'Permanently delete my account and remove acess from all workspaces ',
        icon: <IoIcons.IoMdSettings />,
        cName: 'settings-text',
        action: 'deleteAccount'

    },

    {
        title: 'Log out of all devices',           
        text: "Log out of all other active sessions on other devices besides this one.",
        icon: <TbLogout />,       
        cName: 'settings-text',
        action: 'logoutAll'
    },

    // END OF MY ACCOUNT SETTINGS 


    // START OF MY SETTINGS 


    {
        title: 'Appearance',           
        text: "Customize how Notion looks on your device.",
        icon: <TbLogout />,       
        cName: 'settings-text',
        action: 'setAppearance'
    },

    // END OF MY SETTINGS 

    
    
    // START OF MY NOTIFICATIONS 

    {
        title: 'Notifications',           
        text: "Recieve emails reminders, requests and property changes ",
        icon: <TbLogout />,       
        cName: 'settings-text',
        action: 'setNotifications'
    },


];
