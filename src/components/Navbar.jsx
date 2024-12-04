import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="Navbar_main">
      <div className="Navbar_container">
        <div className="Navbar_logo">
          <img src="./RBAC.png" alt="RBAC Logo" className="Navbar_logo" />
        </div>
        <div className={`Navbar_tabs ${isMenuOpen ? "open" : ""}`}>
          <div className="tabs">
            <Link to="/">Home</Link>
          </div>
        </div>
        <div className="hamburger_menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
