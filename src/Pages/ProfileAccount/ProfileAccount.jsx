import { useState, useEffect, useContext} from 'react';
import "./ProfileAccount.css";
import { auth } from '/src/Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsCameraFill } from "react-icons/bs";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../Config/FirebaseConfig';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { FirebaseData } from '../../Context/FirebaseContext';

function ProfileAccount() {
  const [user] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState('https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg')
  const [backgroundImg, setBackgroundImg] = useState('https://theoheartist.com/wp-content/uploads/sites/2/2015/01/fbdefault.png');
  const {UserUID} = useParams();
  const {allPosts} = useContext(FirebaseData);
  const [userName, setUsername] = useState('');

  const foundUser = allPosts.filter((item) => item.UserId === UserUID);

  function handleChange(e) {
    if (e.target.files[0]) {
      upload(e.target.files[0], user);
    }
  }


  async function upload(file, account) {
    try {
      const fileRef = ref(storage, "ProfileImages/" + account.uid + '.jpeg');
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      updateProfile(account, { photoURL: downloadURL });
      setPhotoURL(downloadURL);
      toast("Image Posted!", {
        type: "success",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast('Failed to upload the image. Please try again.', { type: 'error', autoClose: 3000 })
    }
  }





    function handleImageBG(e) {
    if (e.target.files[0]) {
      bgImage(e.target.files[0], user);
    }
  }



  async function bgImage(file, account) {
    try {
      const fileRef = ref(storage, "background/" + account.uid + '.jpeg');
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      setBackgroundImg(downloadURL);
      toast("Image Posted!", {
        type: "success",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast('Failed to upload the image. Please try again.', { type: 'error', autoClose: 3000 })
    }
  }
useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }

  const listAllImages = async () => {
      try {
        const backgroundRef = ref(storage, 'background/');
        const listResult = await listAll(backgroundRef);
        const imageRefs = listResult.items;
        const imageUrls = await Promise.all(imageRefs.map((imageRef) => getDownloadURL(imageRef)));

        // Check if user.uid is included in the array of image URLs
        const foundImageUrl = imageUrls.find((url) => url.includes(UserUID));
        if (foundImageUrl) {
          setBackgroundImg(foundImageUrl);
        }

      } catch (error) {
        toast('Failed to upload the image. Please try again.', { type: 'error', autoClose: 3000 })
      }
    };

    listAllImages();

   const listAllPFP = async () => {
      try {
        const backgroundRef = ref(storage, 'ProfileImages/');
        const listResult = await listAll(backgroundRef);
        const imageRefs = listResult.items;
        const imageUrls = await Promise.all(imageRefs.map((imageRef) => getDownloadURL(imageRef)));

        // Check if user.uid is included in the array of image URLs
        const foundImageUrl = imageUrls.find((url) => url.includes(UserUID));
        if (foundImageUrl) {
          setPhotoURL(foundImageUrl);
        }

      } catch (error) {
        toast('Failed to upload the image. Please try again.', { type: 'error', autoClose: 3000 })
      }
    };

    listAllPFP()

  }, [user]);


  const profileImageStyle = [
    {
      backgroundImage: `url(${photoURL})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    {
      backgroundImage: `url(${backgroundImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
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
            <p style={{ color: 'white', paddingLeft: "10px" }}>Change Image</p>
          </div>
          <input
            type="file"
            id="background-img-input"
            accept="image/*"
            required
            className="background-img-input"
            onChange={handleImageBG}
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
          <h3>{foundUser[0]?.CreatedBy}</h3>
        </div>
         <div className="card_count">
            <div className="count">
                <div className="fans">
                    <h3>{foundUser[0]?.LastLogin?.slice(0,16)}</h3>
                    <p>Last Login</p>
                </div>
                <div className="following">
                    <h3>{foundUser[0]?.AccountMade?.slice(0,16)}</h3>
                    <p>Account Made</p>
                </div>
                <div className="post">
                    <h3>{foundUser[0]?.UserEmail}</h3>
                    <p>Email</p>
                </div>
            </div>
             <div className="btn">Follow</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAccount;
