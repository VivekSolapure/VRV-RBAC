import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import UserCard from '../components/UserCard';
import PopupForUsers from '../components/PopupForUsers';

function Home() {

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const CreatepopupRef = useRef(null); // Initialize with null
  useEffect(() => {
    function handleClickOutside(event) {
      if (CreatepopupRef.current && !CreatepopupRef.current.contains(event.target)) {
        setIsCreatePopupOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`home_popup ${isCreatePopupOpen ? 'acticehome_popup' : ''}`}>
        <section ref={CreatepopupRef} className="home_popupForUsers">
          <PopupForUsers></PopupForUsers>
        </section>
      </div>
      <div className="home_main">
        <div className="home_container">
          <div className="home_heading">
            <div className="home_headName">Users Master</div>
            {/* <div className="home_createBtn" onClick={CreateopenPopup}>Create</div> */}
          </div>
            <UserCard></UserCard>
    
          <div className="home_seperation"><div className='home_sperationLine'></div></div>
          {/* <TodoCard></TodoCard> */}
        </div>
      </div>
    </>
  )
}

export default Home