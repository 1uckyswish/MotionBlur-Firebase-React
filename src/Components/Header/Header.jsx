//*import  components
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { db } from '../../Config/FirebaseConfig';
import './Header.css';
import { collection, getDocs} from 'firebase/firestore';

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(()=>{
    console.log(user)
  },[user])

  useEffect(
    ()=>{
      const postRef = collection(db, "Posts");
      getDocs(postRef).then((result)=>{
        console.log(result.docs[0].data())
      }).catch((error)=> console.error(error))
    },[]
  )

  const logOut =()=>{
    navigate('/');
    signOut(auth);
  }

  return (
    <header>
        <h1 onClick={()=>navigate('/')}>Motion</h1>
        <div className='trending-hashtags'>
          <p onClick={()=>navigate('/Trending')}>Trending</p>
          <p onClick={()=>navigate('/MusicPage')}>Music</p>
          <p onClick={()=>navigate('/TimeLine')}>Photos</p>
        </div>
        {
          user?
          <div className='profile-signout-box'>
            <img src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-File.png'/>
            <span>{user?.displayName ? user?.displayName : user?.email}</span>
             <button onClick={logOut}>Log Out</button>
          </div>
          :
           <button onClick={()=>navigate('/SignUp')}>Sign Up</button>
        }
    </header>
  )
}

export default Header