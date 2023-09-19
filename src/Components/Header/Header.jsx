import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '/src/Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import './Header.css';
import { Squeeze as Hamburger } from 'hamburger-react'

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isOpen, setOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const logOut = () => {
    navigate('/');
    signOut(auth);
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showHamburger = viewportWidth <= 650;

    const blockStyle = {
    display: 'none',
  };

    const flexStyle = {
    display: 'flex',
  };

   const handleClick = (path) => {
    navigate(path);
    setOpen(false);
    if(path=== 'AddPost'){
       setOpen(false);
    }
  };

  return (
    <header>
      <h1 onClick={() => navigate('/')}>Motion</h1>
      <div className={user ? 'user-trending-hashtags' : 'trending-hashtags'}>
        <p onClick={() => navigate('/Trending')}>Trending</p>
        <p onClick={() => navigate('/MusicPage')}>Music</p>
        <p onClick={() => navigate('/TimeLine')}>Photos</p>
        {user ? <p onClick={() => navigate('/AddPost')}>Create Post</p> : null}
      </div>
      {user ? (
        <div className='profile-signout-box'>
          {user.photoURL ? (
            <img onClick={() => navigate(`/ProfileAccount/${user?.uid}`)} src={user.photoURL} />
          ) : (
            <img
              onClick={() => navigate(`/ProfileAccount/${user?.uid}`)}
              src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
            />
          )}
          <p id="login-btn" onClick={logOut}>Log Out</p>
        </div>
      ) : (
        <p id="login-btn" onClick={() => navigate('/SignUp')}>Sign Up</p>
      )}
      {showHamburger && <Hamburger toggled={isOpen} toggle={setOpen} />}
      <div className='hamburger-slider' style={isOpen? flexStyle : blockStyle}>
      {
        user && <p className='menu-item' onClick={() => handleClick(`/ProfileAccount/${user?.uid}`)}>Profile</p>
      }
      <p className='menu-item' onClick={() => handleClick('/Trending')}>Trending Posts</p>
      <p className='menu-item' onClick={() => handleClick('/MusicPage')}>Music Videos</p>
      <p className='menu-item' onClick={() => handleClick('/TimeLine')}>Photos</p>
        {user ? <p onClick={() => handleClick('/AddPost')}>Create a post</p> : null}
        {
          user ?
           <p onClick={logOut}>Log Out</p>
           :
           <p onClick={() => handleClick('/SignUp')}>Sign Up</p>
        }
      </div>
    </header>
  );
}

export default Header;

