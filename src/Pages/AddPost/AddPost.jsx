import React, { useState, useEffect } from 'react';
import './AddPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage, db, auth } from '../../Config/FirebaseConfig';
import { v4 } from 'uuid';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Modal from 'react-modal';

function AddPost() {
  const [mediaType, setMediaType] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Caption: '',
    PostType: '',
    MediaUrl: '',
  });

  const [user] = useAuthState(auth);
  const postRef = collection(db, 'Posts');

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  function handleSubmitForm(e) {
    e.preventDefault();

    // Check if the required fields are filled
    if (!formData.Caption || !formData.PostType || !formData.MediaUrl) {
      toast('Please fill all required fields.', { type: 'error', autoClose: 3000 });
      return;
    }

    setIsOpen(true); // Open the modal here to show the spinner

    if (mediaType) {
      // Handle video upload (Youtube link)
      addDoc(postRef, {
        Caption: formData.Caption,
        PostType: formData.PostType,
        MediaUrl: formData.MediaUrl,
        CreatedBy: user.displayName,
        UserId: user.uid,
        CreatedAt: Timestamp.now().toDate(),
      })
        .then((results) => {
          setIsOpen(false);
          toast('Post Saved Successfully!', { type: 'success', autoClose: 1000 });
          setTimeout(() => {
            navigate('/MusicPage');
          }, 2000);
        })
        .catch((error) => console.error(error));
    } else {
      // Handle image upload
      const imageRef = ref(storage, `images/${formData.MediaUrl.name + v4()}`);
      uploadBytes(imageRef, formData.MediaUrl)
        .then((response) => {
          getDownloadURL(response.ref).then((url) => {
            addDoc(postRef, {
              Caption: formData.Caption,
              PostType: formData.PostType,
              MediaUrl: url,
              CreatedBy: user.displayName,
              UserId: user.uid,
              CreatedAt: Timestamp.now().toDate(),
            });
          });
        })
        .then((results) => {
          setIsOpen(false);
          toast('Post Saved Successfully!', { type: 'success', autoClose: 1000 });
          setTimeout(() => {
            navigate('/TimeLine');
          }, 2000);
        })
        .catch((error) => {
          setIsOpen(false);
          toast('Failed to upload the image. Please try again.', { type: 'error', autoClose: 3000 });
        });
    }
  }

  const handleMediaUrl = (e) => {
    const optionValue = e.target.value;
    setMediaType(optionValue === 'Video');
    setFormData({ ...formData, PostType: e.target.value });
  };

  const ImageUrlState = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setFormData({ ...formData, MediaUrl: selectedImage });
  };

  const videoUrlState = (e) => {
    const videoLink = e.target.value;
    setYoutubeLink(videoLink);
    setFormData({ ...formData, MediaUrl: videoLink });
  };

  const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Darken the overlay to make the modal stand out more
    // zIndex: 1000, // Ensure the overlay is on top of other elements
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto", // Increase the width for a better display
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)", // Light gray background for a modern look
    border: "none", // Remove the border for a cleaner appearance
    borderRadius: "8px", // Round the corners of the modal
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0)", // Add a subtle shadow to lift the modal
  },
};



  Modal.setAppElement(document.getElementById('root'));

  return (
    <div className='add-post-container'>
      <h2>Create A Post</h2>
      <div className='post-form-container'>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor='caption'>Post Caption</label>
          <textarea
            id='caption'
            placeholder='Write your caption here...'
            onChange={(e) => setFormData({ ...formData, Caption: e.target.value })}
            required
          />
          <label htmlFor='post-type'>Post Type</label>
          <select id='post-type' onChange={handleMediaUrl} required>
            <option value=''>Select</option>
            <option value='Video'>Music</option>
            <option value='Picture'>Picture</option>
          </select>

          {mediaType ? (
            <>
              <label htmlFor='FileUrl'>Youtube Video Link</label>
              <input type='text' id='FileUrl' onChange={videoUrlState} required />
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
              <label htmlFor='FileUrl'>Upload Image</label>
              <input
                className='image-file'
                type='file'
                id='FileUrl'
                accept='image/*'
                onChange={ImageUrlState}
                required
              />
              <label htmlFor='FileUrl' className='custom-file-label' id='label-size'>
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
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <ScaleLoader color='#efb6b2' height='100px'/>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
