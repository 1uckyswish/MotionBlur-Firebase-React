import {useState, useEffect} from 'react'
import "./AddPost.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPlayer from 'react-player';

function AddPost() {
  const [progress, setProgress] = useState(0);
  const [mediaType, setMediaType] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  
  const handleButtonClick = ()=>{
    if(progress < 100){
      setProgress(progress +20)
    }
  };

  const handleButtonRest = ()=>{
    setProgress(0);
  };

  const getColor = ()=>{
    if(progress < 30){
      return '#ff0000'
    }else if (progress < 60){
      return '#ff9900'
    }else if (progress < 90){
      return '#C8EF1A'
    }else{
      return '#2ecc71'
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleMediaUrl = (e)=>{
    const optionValue = e.target.value;
    if(optionValue === "Video"){
      setMediaType(true)
    }else if (optionValue === "Picture"){
      setMediaType(false)
    }else{
      setMediaType(false)
    }
  };

  return (
    <div className='add-post-container'>
        <h2>Create A Post</h2>
        <div className='container-progress'>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: `${progress}%`, backgroundColor: getColor() }}></div>
          </div>
        </div>
      <div className='post-form-container'>
        <form>
          <label htmlFor="caption">Post Caption</label>
          <textarea id='caption' placeholder='caption' onChange={()=>setProgress(20)} required/>
          <label htmlFor="post-type">Post Type</label>
          <select id="post-type" onChange={handleMediaUrl} required>
          <option value="">Select</option>
          <option value="Video">Music</option>
          <option value="Picture">Picture</option>
          </select>
          {
            mediaType?
              <>
            <label htmlFor="FileUrl">Youtube Video Link</label>
          <input type="text" id='FileUrl' onChange={(e)=>setYoutubeLink(e.target.value)} required/>
          <div className='youtube-box'><ReactPlayer url={youtubeLink} controls={true} className="video"/></div>
          </>
            :
          <><label htmlFor="FileUrl">Upload Image</label>
          <input className='image-file' type="file" id='FileUrl' accept='image/*' onChange={(e)=> setSelectedImage(e.target.files[0])} required/>
          <label for="FileUrl" class="custom-file-label" id="label-size">Choose an Image</label>
          <img src={imageUrl} style={imageUrl?{display: "block"} : {display: "none"}}/>
          </>
          }
        </form>
      </div>
    </div>
  )
}

export default AddPost




 {/* <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image" style={{ cursor: "pointer" }}>
        <span
          style={{
            backgroundColor: "#3f51b5",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload Image
        </span>
      </label>
      {imageUrl && selectedImage && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div>Image Preview:</div>
          <img
            src={imageUrl}
            alt={selectedImage.name}
            style={{ height: "100px" }}
          />
        </div>
      )} */}



