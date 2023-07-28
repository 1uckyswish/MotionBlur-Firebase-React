import React from 'react';
import './Trending.css';
import SinglePost from '../../Components/SinglePost/SinglePost';
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';
import MusicPost from '../../Components/MusicPost/MusicPost';

function Trending() {
  const {allPosts, isYouTubeLink} = useContext(FirebaseData);
  console.log(allPosts)

// console.log(allPosts)
  return (
    <div className='music-page-container'>
      <h2>Trending</h2>
      {allPosts.map((item) => {
        if (isYouTubeLink(item?.MediaUrl)) {
          return <MusicPost post={item?.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption} id={item?.id}/>;
        } else {
          return <SinglePost image={item?.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption} id={item?.id}/>;
        }
      })}
    </div>
  );
}

export default Trending;
