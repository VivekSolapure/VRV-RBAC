import React from 'react';

function PopupForUsers({ isOpen, setIsPopupOpen, whichUserkey, whichUsertitle, selectedRole }) {
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        isOpen && (
            <div className="popup">
                <div className="popup-content">
                    <h2>{whichUsertitle}</h2>
                    <p>Role: {selectedRole}</p>
                    <button onClick={closePopup}>Close</button>
                </div>
            </div>
        )
    );
}

export default PopupForUsers;
