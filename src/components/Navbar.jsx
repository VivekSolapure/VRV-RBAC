import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className='Navbar_main'>
        <div className="Navbar_container">
            <div className="Navbar_logo">
                <img src="./Notes_logo.png" alt="" className="Navbar_logo" />
            </div>
            <div className="Navbar_tabs">
                <div className="tab1"><Link to='/'>Home</Link></div> 
                <div className="tab2"><Link to='/guide'>How it Works</Link></div>
            </div>
            {/* <div className="Navbar_buttons">
                <div id='deactive'>
                    <p>Login</p>
                </div>
                <div id='active'>
                    <p>Signup</p>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Navbar