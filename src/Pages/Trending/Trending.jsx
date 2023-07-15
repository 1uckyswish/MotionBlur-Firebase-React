import React from 'react';
import './Trending.css';
import TrendingPost from '../../Components/TrendingPost/TrendingPost';
import SinglePost from '../../Components/SinglePost/SinglePost';

function Trending() {
 const links = [
  "https://www.youtube.com/embed/9bZkp7q19f0?start=69",
  "https://images.unsplash.com/photo-1688383213635-9bc2fc25103d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://www.youtube.com/embed/tG35R8F2j8k?start=69",
  "https://images.unsplash.com/photo-1600832501609-0ba64370e7ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  "https://images.unsplash.com/photo-1536009744269-d24508b32196?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1587279484404-29792a7c375c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://www.youtube.com/embed/76O3w4pt0CA?start=69",
  "https://images.unsplash.com/photo-1536009744269-d24508b32196?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://www.youtube.com/embed/Czs2B53M444?start=69"
];


  function isYouTubeLink(link) {
    return link.includes('youtube.com');
  }

  return (
    <div className='music-page-container'>
      <h2>Trending</h2>
      {links.map((item) => {
        if (isYouTubeLink(item)) {
          return <TrendingPost post={item} />;
        } else {
          return <SinglePost image={item} />;
        }
      })}
    </div>
  );
}

export default Trending;
