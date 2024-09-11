import './Settings.css'
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useState, useEffect } from 'react';

function Settings(){
    const [setting, setSetting] = useState(null)


    return(
        <div className = "settings">
            <Navbar/>
            <Header/>

            <div className = "setting-options">
                <h3> Account Settings </h3>
                <h3> Notification Preferences </h3>
                <h3> Theme and Appearance  </h3>
                <h3> Data and Privacy  </h3>
                <h3> App Preferences </h3>
            </div>


            <div className = "settings-content">
                <div className = "settings-left-side">
                    <h3> Left Side</h3>
                </div>

                <div className = "settings-right-side">
                    <h3> Right side</h3>

                </div>

            </div>


        </div>
    )

}


export default Settings; 