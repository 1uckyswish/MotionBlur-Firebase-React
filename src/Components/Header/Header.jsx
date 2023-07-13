import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(()=>{
    console.log(user)
  },[user])

  const logOut =()=>{
    navigate('/');
    signOut(auth);
  }

  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Motion</h1>
        <div className='trending-hashtags'>
          <p onClick={()=>navigate('/TimeLine')}>Trending</p>
          <p>Music</p>
          <p>Photos</p>
        </div>
        {
          user?
          <div className='profile-signout-box'>
            <span>{user?.displayName}</span>
             <button onClick={logOut}>Log Out</button>
          </div>
          :
           <button onClick={()=>navigate('/SignUp')}>Sign Up</button>
        }
    </header>
  )
}

export default Header