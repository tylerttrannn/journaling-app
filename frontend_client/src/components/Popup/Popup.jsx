import React, { useState } from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, title, message, actions, textFields }) {
    const [inputValues, setInputValues] = useState({});

    if (!isOpen) return null;

    // Handle input change for dynamic text fields
    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        setInputValues({
            ...inputValues,
            [index]: value
        });
    };

    return (
        <div className="popup">
            <div className="popup-overlay" onClick={onClose}></div>
            <div className="popup-content">
                {title && <h2>{title}</h2>}
                {message && <p>{message}</p>}
                
                {/* Render the text fields */}
                {textFields && textFields.map((field, index) => (
                    <div key={index} className="popup-text-field">
                        <label className="popup-label">{field.label}</label>
                        <input
                            type="text"
                            className="popup-input"
                            value={inputValues[index] || ''} // Use the state to store the input value
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    </div>
                ))}

                <div className="popup-buttons">
                    {actions && actions.map((action, index) => (
                        <button 
                            key={index} 
                            onClick={() => action.onClick(inputValues)}>
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Popup;
