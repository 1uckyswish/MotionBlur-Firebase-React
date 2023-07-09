import React from 'react'
import "./AdGrid.css"

function AdGrid() {
  return (
    <section>
        <div className='ad-container'>
            <div className='ad-box ad-1'>
                <div className='ad-info-1'>
                     <h2>Discover & collaborate with others</h2>
                     <p> vibrant community of artists, photographers, music lovers, and dreamers. Unleash your imagination, find inspiration, and ignite conversations that transcend boundaries. </p>
                </div>
                <div className='ad-image-1'></div>
            </div>
            <div className='ad-box ad-2'>
                 <div className='ad-image-2'></div>
                 <div className='ad-info-2'> 
                    <h2>Follow & Like</h2>
                    <p>Ignite conversations with captivating content. Leave your mark through thought-provoking visuals and heart-pounding beats.</p>
                 </div>
            </div>
            <div className='ad-box ad-3'>
                 <div className='ad-info-3'>
                     <h2>About</h2>
                    <p>Unleash your creativity! Share passions through captivating visuals and soulful music. Experience art and sound seamlessly. Join us today!</p>
                 </div>
                <div className='ad-image-3'></div>
            </div>
        </div>
    </section>
  )
}

export default AdGrid
