import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '/src/Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import './Header.css';
import { Spiral as Hamburger } from 'hamburger-react';

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [isOpen, setOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const logOut = () => {
    navigate('/');
    signOut(auth);
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
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <button onClick={() => navigate('/SignUp')}>Sign Up</button>
      )}
      {showHamburger && <Hamburger toggled={isOpen} toggle={setOpen} />}
    </header>
  );
}

export default Header;
