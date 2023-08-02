import {useState} from 'react';
import "./ProfileAccount.css";
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { FiEdit } from "react-icons/fi";
import { BsCameraFill } from "react-icons/bs";

function ProfileAccount() {
    const profileImageStyle = [
        {
        background: 'url("https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1108&q=80")',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center',
    },
    {
        background: 'url("https://images.unsplash.com/photo-1484318571209-661cf29a69c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center',
    },
    ]

  const [user] = useAuthState(auth);
  const [followUser, setFollowUser] = useState(true);




  return (
    <div className='profile-container'>
    <div className="card">
      <div className="card_background_img" style={profileImageStyle[1]}></div>
      <label htmlFor="background-img-input" className="icon-wrapper">
    <FiEdit className="edit-icon" />
    <input
      type="file"
      id="background-img-input"
      accept="image/*"
      required
      className="background-img-input"
    />
  </label>
      <div className="card_profile_img" style={profileImageStyle[0]}></div>
      <label htmlFor="profile-img-input" className="profile-icon-wrapper">
        <div className='icon-circle'><BsCameraFill className="profile-edit-icon" /></div>
        <input
          type="file"
          id="profile-img-input"
          accept="image/*"
          required
          className="profile-img-input"
        />
      </label>
      <div className="user_details">
        <h3>{user?.displayName}</h3>
        <p>{user?.email}</p>
      </div>
      <div className="card_count">
        <div className="count">
          <div className="fans">
            <h3>100</h3>
            <p>Liked Posts</p>
          </div>
          <div className="following">
            <h3>202</h3>
            <p>Followings</p>
          </div>
          <div className="post">
            <h3>552</h3>
            <p>Posts</p>
          </div>
        </div>
       {
        followUser?
          <div onClick={()=> setFollowUser(!followUser)} className="btn">Follow</div>
         :
          <div onClick={()=> setFollowUser(!followUser)} className="btn">UnFollow</div>
       }
      </div>
    </div>
  </div>
  );
}

export default ProfileAccount;
