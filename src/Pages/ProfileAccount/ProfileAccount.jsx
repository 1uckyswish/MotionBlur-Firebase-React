import React from 'react';
import "./ProfileAccount.css";

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
  return (
    <div className="card">
      <div className="card_background_img" style={profileImageStyle[1]}></div>
      <div className="card_profile_img" style={profileImageStyle[0]}></div>
      <div className="user_details">
        <h3>Gordon Ramsay</h3>
        <p>Master Chef</p>
      </div>
      <div className="card_count">
        <div className="count">
          <div className="fans">
            <h3>2.4M</h3>
            <p>Fans</p>
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
        <div className="btn">Follow</div>
      </div>
    </div>
  );
}

export default ProfileAccount;
