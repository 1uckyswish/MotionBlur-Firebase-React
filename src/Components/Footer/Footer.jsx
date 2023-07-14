import React from 'react'
import "./Footer.css"
//Import components
import { AiFillFacebook} from "react-icons/ai";
import { FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer>
        <div className='icon-container'>
        <AiFillFacebook/>
        <FaInstagram />
        <FaTwitter />
        </div>
      <h1>Motion</h1>
      <div className='copyright-container'>
         &copy; MotionBlurr 2023
      </div>
    </footer>
  )
}

export default Footer
