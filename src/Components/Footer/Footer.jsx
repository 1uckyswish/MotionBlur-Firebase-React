import React from 'react'
//Import css files
import "./Footer.css"
//Import components
import { AiFillGithub, AiFillLinkedin, AiFillInstagram} from "react-icons/ai";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
        <div className='icon-container'>
        <Link to="https://www.linkedin.com/in/noel-guillen-blas-b63353257/?trk=people-guest_people_search-card"><AiFillLinkedin /></Link>
        <Link to="https://github.com/1uckyswish"><AiFillGithub/></Link>
         <Link to="https://www.instagram.com/luckideveloper/"><AiFillInstagram /></Link>
        </div>
      <h1>Motion</h1>
      <div className='copyright-container'>
         &copy; MotionBlurr 2023
      </div>
    </footer>
  )
}

export default Footer
