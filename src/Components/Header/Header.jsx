//*import  components
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const logOut =()=>{
    navigate('/');
    signOut(auth);
  }


  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Motion</h1>
        <div className={user? 'user-trending-hashtags' : 'trending-hashtags'}>
          <p onClick={()=>navigate('/Trending')}>Trending</p>
          <p onClick={()=>navigate('/MusicPage')}>Music</p>
          <p onClick={()=>navigate('/TimeLine')}>Photos</p>
          {
            user?
             <p onClick={()=>navigate('/AddPost')}>Create Post</p>
             :
            null
          }
        </div>
        {
          user?
          <div className='profile-signout-box'>
            {
              user.photoURL?
              <img onClick={()=>navigate(`/ProfileAccount/${user?.uid}`)} src={user.photoURL}/>
              :
              <span onClick={()=>navigate(`/ProfileAccount/${user?.uid}`)}>{user?.displayName ? user?.displayName : user?.email}</span>
            }
            {/* <span onClick={()=>navigate('/ProfileAccount')}>{user?.displayName ? user?.displayName : user?.email}</span> */}
             <button onClick={logOut}>Log Out</button>
          </div>
          :
           <button onClick={()=>navigate('/SignUp')}>Sign Up</button>
        }
    </header>
  )
}

export default Header