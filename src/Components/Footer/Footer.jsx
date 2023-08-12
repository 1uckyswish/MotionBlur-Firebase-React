import React from 'react'
//Import css files
import "./Footer.css"
//Import components
import { AiFillGithub, AiFillLinkedin, AiFillInstagram} from "react-icons/ai";

function Footer() {
  return (
    <footer>
        <div className='icon-container'>
        <AiFillLinkedin />
        <AiFillGithub/>
        <AiFillInstagram />
        </div>
      <h1>Motion</h1>
      <div className='copyright-container'>
         &copy; MotionBlurr 2023
      </div>
    </footer>
  )
}

export default Footer
