import React from 'react';
import './Popup.css';

function Popup({ isOpen, onClose, title, message, actions }) {
    if (!isOpen) return null; // Render nothing if the popup is closed

    return (
        <div className="popup">
            <div className="popup-overlay" onClick={onClose}></div>
            <div className="popup-content">
                {title && <h2>{title}</h2>}
                {message && <p>{message}</p>}
                <div className="buttons">
                    {actions && actions.map((action, index) => (
                        <button key={index} onClick={action.onClick}>
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Popup;
