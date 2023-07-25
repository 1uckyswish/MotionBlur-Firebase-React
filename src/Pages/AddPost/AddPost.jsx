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

function AddPost() {
  const [mediaType, setMediaType] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    Caption: '',
    PostType: '',
    MediaUrl: '',
  });

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // set a  function to handle the form submit when the user clicks the button
  function handleSubmitForm(e){
    e.preventDefault();
    // create a reference for the image
    const imageRef = ref(storage, `images/${formData.MediaUrl.name + v4()}`);
    //upload to bucket
    uploadBytes(imageRef, formData.MediaUrl).then((response)=>{
      getDownloadURL(response.ref);
    })
    .catch((error)=> console.error(error));
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
          <textarea id='caption' placeholder='Write your caption here...' onChange={(e)=>setFormData({...formData, Caption: e.target.value})}/>

          <label htmlFor="post-type">Post Type</label>
          <select id="post-type" onChange={handleMediaUrl} >
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
