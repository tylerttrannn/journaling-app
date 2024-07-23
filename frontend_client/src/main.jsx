import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Register from './Register.jsx';
import NotFoundPage from './NotFoundPage.jsx';


const router = createBrowserRouter([{
  path: '/',
  element: <App/>,
  errorElement: <NotFoundPage/>
 },

 {
  path: '/register',
  element: <Register/>
 }
 

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
