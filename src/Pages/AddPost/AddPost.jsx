import {useState, useEffect} from 'react'
import "./AddPost.css"

function AddPost() {
  const [progress, setProgress] = useState(50);
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

  return (
    <div className='add-post-container'>
        <h2>Create A Post</h2>
        <div className='container-progress'>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{width: `${progress}%`, backgroundColor: getColor() }}></div>
          </div>
          {/* <div className="progress-label">{progress}%</div>
          <button onClick={handleButtonClick}>add</button>
          <button onClick={handleButtonRest}>rest</button> */}
        </div>
      <div className='form-container'>
        <form>
          <label htmlFor="caption">Caption</label>
          <input type="text" id='caption' />
          <label htmlFor="post-type">Post Type</label>
          <select id="post-type">
          <option value="">Select</option>
          <option value="Video">Music</option>
          <option value="Picture">Picture</option>
          </select>
          <label htmlFor="FileUrl">Upload Image</label>
          <input type="file" id='FileUrl' accept='image/*' onChange={(e)=> setSelectedImage(e.target.files[0])} style={{display: "none"}}/>
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

        <img src={imageUrl} />




        </form>
      </div>
    </div>
  )
}

export default AddPost
