//import React from 'react'
import caditLogo from "../../Media/Image/CADIT-LOGO.png"
import "./Navbar.scss"

function Navbar(){
  return (
    <div className="container-header">
        <img src={caditLogo} alt="" className="navbar-image" />
    </div>
  )
}

export default Navbar