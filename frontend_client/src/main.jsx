import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';

import Journal from './views/Journal/Journal.jsx';
import FrontPage from './views/FrontPage/FrontPage.jsx';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import NewNote from './views/Journal/NewNote.jsx';
import NoteDetails from './views/Journal/NoteDetails.jsx'

import Popup from './components/Popup/Popup.jsx'


const router = createBrowserRouter([
 {
  path: '/',
  element: <FrontPage/>,
  errorElement: <NotFoundPage/>

 },

 {
  path: '/register',
  element: <Register/>
 },

 {
  path: '/login',
  element: <Login/>
 },

 {
  path: '/journal',
  element: <Journal/>,
 },

 {
  path: '/navbar',
  element: <Navbar/>
 },

 {
  path: '/journal/new-note',
  element: <NewNote/>
 },

 {
  path: '/journal/note/:noteId',
  element: <NoteDetails/>
 },

 {
  path: '/popup',
  element: <Popup/>
 }



]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
