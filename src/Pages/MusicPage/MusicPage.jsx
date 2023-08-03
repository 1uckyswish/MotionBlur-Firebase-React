//*import  components
import React from 'react';
import MusicPost from '../../Components/MusicPost/MusicPost';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MusicPage.css";
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';


function MusicPage() {
  const {allPosts, isYouTubeLink} = useContext(FirebaseData);

  return (
    <div className='music-page-container'>
    <h2>Music</h2>
    {
        allPosts.map((item)=>{
          if(isYouTubeLink(item?.MediaUrl)){
             return <MusicPost post={item.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption} id={item?.id} userId={item.UserId}/>
          }else{
            return null;
          }
        })
    }
    </div>
  )
}

export default MusicPage
