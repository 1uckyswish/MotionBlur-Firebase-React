// AddPost.jsx
import React, { useState, useEffect } from 'react';
import './AddPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
//make sure the user is logged in
import { useAuthState } from 'react-firebase-hooks/auth';
// get the firestore exports from the config file
import { storage, db, auth } from '../../Config/FirebaseConfig';
import {v4} from 'uuid';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const [mediaType, setMediaType] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Caption: '',
    PostType: '',
    MediaUrl: '',
  });
  //get user profile
  const [user] = useAuthState(auth);

   // * creating a post reference
        const postRef = collection(db, 'Posts');

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // TODO change function to ternary op
  // set a  function to handle the form submit when the user clicks the button
  function handleSubmitForm(e){
    e.preventDefault();
    //upload to bucket
    if(mediaType){
       addDoc(postRef, {
          Caption: formData.Caption,
          PostType: formData.PostType,
          MediaUrl: formData.MediaUrl,
          CreatedBy: user.displayName,
          UserId: user.uid,
          CreatedAt: Timestamp.now().toDate(),
        }).then((results)=>{
      toast('Post Saved Successfully!', {type: "success", autoClose: 3000});
      setTimeout(() => {
        //* for music page
         navigate('/MusicPage');
      }, 4000);
    })
    .catch((error)=> console.error(error));
    }else{
       // create a reference for the image
    const imageRef = ref(storage, `images/${formData.MediaUrl.name + v4()}`);
      uploadBytes(imageRef, formData.MediaUrl).then((response)=>{
      getDownloadURL(response.ref)
      .then((url)=>{
        // all data and url for image
        // use add doc to add post
        addDoc(postRef, {
          Caption: formData.Caption,
          PostType: formData.PostType,
          MediaUrl: url,
          CreatedBy: user.displayName,
          UserId: user.uid,
          CreatedAt: Timestamp.now().toDate(),
        });
        // add spinner
      });
    }).then((results)=>{
      // hide spinner 
      toast('Post Saved Successfully!', {type: "success", autoClose: 3000});
      setTimeout(() => {
        //* image page
         navigate('/TimeLine');
      }, 4000);
    })
    .catch((error)=> console.error(error));
    }
  }

// handles the condtional rendering of JSX and also sets value for database
  const handleMediaUrl = (e) => {
    const optionValue = e.target.value;
    setMediaType(optionValue === 'Video');
    setFormData({...formData, PostType: e.target.value})
  };

  // set the state of the on change for image 
  const ImageUrlState = (e) => {
    const selectedImage = e.target.files[0]; // Get the selected image
    setSelectedImage(selectedImage);
    setFormData({ ...formData, MediaUrl: selectedImage }); // Set the selected image as MediaUrl
  };
  // set the state of the on change for video link 
  const videoUrlState = (e) => {
    const videoLink = e.target.value; // Get the video link from the input field
    setYoutubeLink(videoLink);
    setFormData({ ...formData, MediaUrl: videoLink }); // Set the video link as MediaUrl
  };




  return (
    <div className='add-post-container'>
      <h2>Create A Post</h2>
      <div className='post-form-container'>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="caption">Post Caption</label>
          <textarea id='caption' placeholder='Write your caption here...' onChange={(e)=>setFormData({...formData, Caption: e.target.value})} required/>

          <label htmlFor="post-type">Post Type</label>
          <select id="post-type" onChange={handleMediaUrl} required>
            <option value="">Select</option>
            <option value="Video">Music</option>
            <option value="Picture">Picture</option>
          </select>

          {mediaType ? (
            <>
              <label htmlFor="FileUrl">Youtube Video Link</label>
              <input
                type="text"
                id='FileUrl'
                onChange={videoUrlState}
                required
              />
              <div className='youtube-box'>
                <ReactPlayer
                  url={youtubeLink}
                  controls={true}
                  className='video'
                  style={youtubeLink ? { display: 'block' } : { display: 'none' }}
                />
              </div>
            </>
          ) : (
            <>
              <label htmlFor="FileUrl">Upload Image</label>
              <input
                className='image-file'
                type="file"
                id='FileUrl'
                accept='image/*'
                onChange={ImageUrlState}
                required
              />
              <label htmlFor="FileUrl" className="custom-file-label" id="label-size">
                {selectedImage ? selectedImage.name : 'Choose an Image'}
              </label>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={selectedImage?.name}
                  style={imageUrl ? { display: 'block' } : { display: 'none' }}
                />
              )}
            </>
          )}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
