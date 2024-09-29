import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

import { TbLogout } from 'react-icons/tb';
import { MdDriveFileRenameOutline, MdEmail, MdOutlinePassword, MdDelete, MdDarkMode} from "react-icons/md";


export const settingsData = [
  {
    category: 'Account',
    settings: [
      {
        title: 'Preferred name',
        text: '',
        icon: <MdDriveFileRenameOutline/>,
        cName: 'settings-text',
        action: 'changeName'
      },

      {
        title: 'Email',
        text: '',
        icon: <MdEmail/>,
        cName: 'settings-text',
        action: 'changeEmail',
      },
      {
        title: 'Password',
        text: 'Set a permanent password to login to your account ',
        icon: <MdOutlinePassword />,
        cName: 'settings-text',
        action: 'setPassword',
      },

      {
        title: 'Delete my account',
        text: 'Permanently delete my account and remove access from all workspaces',
        icon: <MdDelete/>,
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
        icon: <MdDarkMode/>,
        cName: 'settings-text',
        action: 'setAppearance',
      },
    ],
  },
 
];
