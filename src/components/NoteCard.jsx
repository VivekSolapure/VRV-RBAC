import React, { useState, useRef, useEffect } from 'react';
import PopupForNotes from './PopupForNotes';
import './NoteCard.css'


function NoteCard() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef(null); // Initialize with null
    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    return (
        <>
            <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`}>
                <section ref={popupRef} className="home_popupForNotes">
                    <PopupForNotes></PopupForNotes>
                </section>
            </div>
            <div className="home_notesList" onClick={openPopup}>
                <div className="home_noteHeading">
                    <div className="home_noteName">Web Design</div>
                    <div className="home_noteEditLogo">
                        <img src="./edit.svg" alt="" />
                    </div>
                </div>
                <div className="home_notePara">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt harum cupiditate officiis. Atque numquam sint nesciunt neque facilis accusamus. Fuga officiis sed alias reprehenderit deserunt repellendus suscipit veniam quidem voluptatum. From concept to launch, we create stunning, user-centric websites that elevate your brand and engage your audience.</div>
            </div>
        </>
    )
}

export default NoteCard