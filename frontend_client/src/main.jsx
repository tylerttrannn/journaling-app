import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';

import Dashboard from './views/Dashboard/Dashboard.jsx';
import FrontPage from './views/FrontPage/FrontPage.jsx';
import Login from './views/Login/Login.jsx';
import Register from './views/Register/Register.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';



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
  path: '/dashboard',
  element: <Dashboard/>,

 },

 {
  path: '/navbar',
  element: <Navbar/>
 }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
