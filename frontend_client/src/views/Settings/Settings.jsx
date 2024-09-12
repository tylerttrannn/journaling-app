import './Settings.css'
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';
import { useState, useEffect } from 'react';

function Settings(){
    const [setting, setSetting] = useState(null)

    const handleClick = async () => {

    }

    return(
        <div className = "settings">
            <Navbar/>
            <Header/>

            <div className = "setting-options">
                <button> Account Settings </button>
                <button> Notification Preferences </button>
                <button> Theme and Appearance  </button>
                <button> Data and Privacy  </button>
                <button> App Preferences </button>
            </div>


            <div className = "settings-content">
                <div className = "settings-left-side">
                    <p> Left Side</p>
                </div>

                <div className = "settings-right-side">
                    <p> Right side</p>
                </div>
            </div>


        </div>
    )

}


export default Settings; 