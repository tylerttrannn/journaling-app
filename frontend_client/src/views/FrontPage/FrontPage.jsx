import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import Footer from './Footer.jsx';
import './FrontPage.css';

function FrontPage(){
    return(
    <div>
        <Footer></Footer>
    </div>
    )
}



export default FrontPage;