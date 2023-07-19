//*import  components
import React from 'react';
import MusicPost from '../../Components/MusicPost/MusicPost';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MusicPage.css";
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';


function MusicPage() {
  const {allPosts, isYouTubeLink} = useContext(FirebaseData);
   const links = [
  'https://www.youtube.com/embed/TOGswC4X8Nc?start=278',
  'https://www.youtube.com/embed/hc9EBvwkSzY?start=1',
  'https://www.youtube.com/embed/COz9lDCFHjw?start=59',
  'https://www.youtube.com/embed/H5v3kku4y6Q?start=14'
];

  return (
    <div className='music-page-container'>
    <h2>Music</h2>
    {
        allPosts.map((item)=>{
          if(isYouTubeLink(item?.MediaUrl)){
             return <MusicPost video={item.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption}/>
          }else{
            return null;
          }
        })
    }
    </div>
  )
}

export default MusicPage
