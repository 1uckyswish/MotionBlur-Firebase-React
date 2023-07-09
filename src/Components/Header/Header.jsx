import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Motion</h1>
        <div className='trending-hashtags'>
          <p>Trending</p>
          <p>Music</p>
          <p>Photos</p>
          <p>Profile</p>
        </div>
        <button onClick={()=>navigate('/SignUp')}>Sign Up</button>
    </header>
  )
}

export default Header