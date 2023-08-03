import {useState, useEffect} from 'react';
import "./ProfileAccount.css";
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { BsCameraFill } from "react-icons/bs";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/FirebaseConfig';
import { updateProfile } from 'firebase/auth';

function ProfileAccount() {
    const [user] = useAuthState(auth);
    const [followUser, setFollowUser] = useState(true);
    const [photoURL, setPhotoURL] = useState('https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg')
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false);

   function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      upload(e.target.files[0], user);
    }
  }

  // storage
  async function upload(file, account) {
    try {
      const fileRef = ref(storage, account.uid + '.jpeg');
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      updateProfile(account, { photoURL: downloadURL });
      setPhotoURL(downloadURL); // Update the photoURL here after successful upload
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("An error occurred while uploading the photo. Please try again.");
    }
  }

  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);


console.log(user)




   const profileImageStyle = [
  {
    backgroundImage: `url(${photoURL})`, // Separate backgroundImage property
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', // Separate backgroundSize property
    backgroundPosition: 'center',
  },
  {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1484318571209-661cf29a69c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")', // Separate backgroundImage property
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', // Separate backgroundSize property
    backgroundPosition: 'center',
  },
];



  return (
    <div className='profile-container'>
    <div className="card">
      <div className="card_background_img" style={profileImageStyle[1]}></div>
      <label htmlFor="background-img-input" className="icon-wrapper">
      <div className='background-edit-icon'>
        <BsCameraFill className="edit-icon" />
        <p style={{color: 'white', paddingLeft: "10px"}}>Change Image</p>
      </div>
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
          onChange={handleChange}
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
