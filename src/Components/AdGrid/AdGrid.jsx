//Import css
import React from 'react'
import "./AdGrid.css"

function AdGrid() {
  return (
    <section>
      <div className="container" >
        <div className="ad-box ad-box-1">
          <h2 className="hidden-h2">About</h2>
          <p className="hidden-p">Unleash your creativity! Share passions through captivating visuals and soulful music. Experience art and sound seamlessly. Join us today!</p>
        </div>
        <div className="ad-box ad-box-2">
          <h2 className="hidden-h2">Discover</h2>
          <p className="hidden-p">Vibrant community of artists, photographers, music lovers, and dreamers. </p>
        </div>
        <div className="ad-box ad-box-3">
          <h2 className="hidden-h2">Collaborate</h2>
          <p className="hidden-p">Unleash your imagination, find inspiration, and ignite conversations that transcend boundaries.</p>
        </div>
        <div className="ad-box ad-box-4">
          <h2 className="hidden-h2">Like & Comment</h2>
          <p className="hidden-p">Ignite conversations with captivating content. Leave your mark through thought-provoking visuals and heart-pounding beats.</p>
        </div>
        <div className="ad-box ad-box-5">
          <h2 className="hidden-h2">Share Posts</h2>
          <p className="hidden-p">Unleash your voice! Comment, share, and make an impact. Spread your influence through conversation</p>
        </div>
        <div className="ad-box ad-box-6">
          <h2 className="hidden-h2">Trending Posts</h2>
          <p className="hidden-p">Stay in the loop! Explore trending topics and be part of the buzz.</p>
        </div>
      </div>
    </section>
  )
}

export default AdGrid
