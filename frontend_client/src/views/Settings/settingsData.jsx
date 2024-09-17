import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { TbLogout } from 'react-icons/tb';

export const settingsData = [
  {
    category: 'Account',
    settings: [
      {
        title: 'Preferred name',
        text: '',
        icon: <AiIcons.AiOutlineTrophy/>,
        cName: 'settings-text',
        action: 'changeName'
      },

      {
        title: 'Email',
        text: '',
        icon: <AiIcons.AiFillHome />,
        cName: 'settings-text',
        action: 'changeEmail',
      },
      {
        title: 'Password',
        text: 'Set a permanent password to login to your account ',
        icon: <IoIcons.IoIosJournal />,
        cName: 'settings-text',
        action: 'setPassword',
      },
      {
        title: '2-Step verification',
        text: 'Add an additional layer of security to your account during login',
        icon: <IoIcons.IoIosPhotos />,
        cName: 'settings-text',
        action: 'setVerification',
      },
      {
        title: 'Delete my account',
        text: 'Permanently delete my account and remove access from all workspaces',
        icon: <IoIcons.IoMdSettings />,
        cName: 'settings-text',
        action: 'deleteAccount',
      },
      {
        title: 'Log out of all devices',
        text: 'Log out of all other active sessions on other devices besides this one.',
        icon: <TbLogout />,
        cName: 'settings-text',
        action: 'logoutAll',
      },
    ],
  },
  {
    category: 'Appearance',
    settings: [
      {
        title: 'Appearance',
        text: 'Customize how Notion looks on your device.',
        icon: <TbLogout />,
        cName: 'settings-text',
        action: 'setAppearance',
      },
    ],
  },
  {
    category: 'Notifications',
    settings: [
      {
        title: 'Notifications',
        text: 'Receive email reminders, requests, and property changes',
        icon: <TbLogout />,
        cName: 'settings-text',
        action: 'setNotifications',
      },
    ],
  },
];
