import React from 'react';
import './Trending.css';
import TrendingPost from '../../Components/TrendingPost/TrendingPost';
import SinglePost from '../../Components/SinglePost/SinglePost';
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';

function Trending() {
  const {allPosts, isYouTubeLink} = useContext(FirebaseData);

// console.log(allPosts)
  return (
    <div className='music-page-container'>
      <h2>Trending</h2>
      {allPosts.map((item) => {
        if (isYouTubeLink(item?.MediaUrl)) {
          return <TrendingPost post={item?.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption}/>;
        } else {
          return <SinglePost image={item?.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption} />;
        }
      })}
    </div>
  );
}

export default Trending;
