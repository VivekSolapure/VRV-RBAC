import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import UserCard from '../components/UserCard';

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

  return (
    <>
      <div className={`home_popup ${isPopupOpen ? 'acticehome_popup' : ''}`}>
        <section ref={popupRef} className="home_popupForNotes">
        </section>
      </div>
      <div className="home_main">
        <div className="home_container">
          <div className="home_heading">
            <div className="home_headName">RBAC By Vivek</div>
          </div>
            <UserCard></UserCard>
          <div className="home_seperation"><div className='home_sperationLine'></div></div>
        </div>
      </div>
    </>
  )
}

export default Home