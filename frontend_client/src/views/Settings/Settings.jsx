import './Settings.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/Header/Header.jsx';
import { settingsData } from './settingsData.jsx';
import { useState } from 'react';

function Settings() {
    const [currentCategory, setCurrentCategory] = useState('Account Settings');

    // Find the settings for the currently selected category
    const currentSettings = settingsData.find(
        (category) => category.category === currentCategory )?.settings || [];

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    const handleClick = (action) => {
        console.log('Action clicked:', action);
    };

    return (
        <div className="settings">
            <Navbar />
            <Header />

            <div className="setting-options">
                {settingsData.map((category, index) => (
                    <button key={index} onClick={() => handleCategoryChange(category.category)}>
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
                            <button onClick={() => handleClick(item.action)}>Change</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;
