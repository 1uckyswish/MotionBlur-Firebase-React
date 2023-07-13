import React from 'react';
import MusicPost from '../../Components/MusicPost/MusicPost';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MusicPage.css";


function MusicPage() {
     const array = [1,2,3,4,5]
  return (
    <div className='music-page-container'>
    <h2>Music</h2>
    {
        array.map((item)=>{
            return <MusicPost />
        })
    }
    </div>
  )
}

export default MusicPage
