import {useState} from 'react';
import "./ProfileAccount.css";
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';

function ProfileAccount() {
    const profileImageStyle = [
        {
        background: 'url("https://source.unsplash.com/7Sz71zuuW4k")',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center',
    },
    {
        background: 'url("https://source.unsplash.com/9wg5jCEPBsw")',
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
      <div className="card_profile_img" style={profileImageStyle[0]}></div>
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
