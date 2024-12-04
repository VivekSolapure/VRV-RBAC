import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import NoteCard from '../components/NoteCard';
import PopupForNotes from '../components/PopupForNotes';
import TodoCard from '../components/TodoCard';

function Home() {

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
      <div className="home_main">
        <div className="home_container">
          <div className="home_heading">
            <div className="home_headName">Notes Master</div>
            <div className="home_createBtn" onClick={openPopup}>Create</div>
          </div>
            <NoteCard></NoteCard>
          <div className="home_seperation"><div className='home_sperationLine'></div></div>
          <TodoCard></TodoCard>
        </div>
      </div>
    </>
  )
}

export default Home