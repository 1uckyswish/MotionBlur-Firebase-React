import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
        <h1>Motion</h1>
        <div className='trending-hashtags'>
          <p>Trending</p>
          <p>Music</p>
          <p>Photos</p>
          <p>Profile</p>
        </div>
        <button>Sign Up</button>
    </header>
  )
}

export default Header