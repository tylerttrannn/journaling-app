import './Settings.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';
import { settingsData } from './settingsData.jsx';
import { useState } from 'react';
import { handleClick } from './SettingsFunctions'; // Import functions
import Popup from '../../components/Popup/Popup.jsx';

function Settings() {
    const [currentCategory, setCurrentCategory] = useState('Account Settings');
    const [isPopupOpen, setPopupOpen] = useState(false); // Manage popup visibility
    const [popupContent, setPopupContent] = useState({ title: '', message: '', actions: [] }); // Store popup content

    const currentSettings = settingsData.find(
        (category) => category.category === currentCategory
    )?.settings || [];

    // Updates the popup content and opens it importantly 
    const openPopup = (content) => {
        setPopupContent(content);
        setPopupOpen(true);
    };

    const closePopup = () => setPopupOpen(false);

    return (
        <div className="settings">
            <Navbar />
            <Header />

            <div className="setting-options">
                {settingsData.map((category, index) => (
                    <button key={index} onClick={() => setCurrentCategory(category.category)}>
                        {category.category}
                    </button>
                ))}
            </div>

            <div className="settings-content">
                {currentSettings.map((item, index) => (
                    <div key={index} className="settings-row">
                        <div className="settings-left-side">
                            {item.icon}
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                        <div className="settings-right-side">
                            {/* when the handleClick function is ran it generates and passes the content to 
                            the openPopup function*/}
                            <button onClick={() => handleClick(item.action, openPopup)}>Change</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup component */}
            <Popup 
                isOpen={isPopupOpen} // basically in the popup compenent nothing will render if false
                onClose={closePopup}
                title={popupContent.title}
                message={popupContent.message}
                actions={popupContent.actions}
            />


        </div>
    );
}

export default Settings;
