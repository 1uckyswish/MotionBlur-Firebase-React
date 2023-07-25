// AddPost.jsx
import React, { useState, useEffect } from 'react';
import './AddPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';

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
  console.log(formData)

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleMediaUrl = (e) => {
    const optionValue = e.target.value;
    setMediaType(optionValue === 'Video');
    setFormData({...formData, PostType: e.target.value})
  };

  const ImageUrlState = (e)=>{
    setSelectedImage(e.target.files[0])
    setFormData({...formData, MediaUrl: e.target.value})
  }

    const videoUrlState = (e)=>{
    setFormData({...formData, MediaUrl: e.target.value})
    setFormData({...formData, MediaUrl: e.target.value})
  }


  return (
    <div className='add-post-container'>
      <h2>Create A Post</h2>
      <div className='post-form-container'>
        <form>
          <label htmlFor="caption">Post Caption</label>
          <textarea id='caption' placeholder='Write your caption here...' required onChange={(e)=>setFormData({...formData, Caption: e.target.value})}/>

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
                  onChange={(e) => setYoutubeLink(e.target.value)}
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
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
