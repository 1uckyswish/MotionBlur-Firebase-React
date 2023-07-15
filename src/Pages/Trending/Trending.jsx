import React from 'react'
import './Trending.css'

function Trending() {
   const links = [
  'https://www.youtube.com/embed/TOGswC4X8Nc?start=278',
  'https://www.youtube.com/embed/hc9EBvwkSzY?start=1',
  'https://www.youtube.com/embed/COz9lDCFHjw?start=59',
  'https://www.youtube.com/embed/H5v3kku4y6Q?start=14'
];


  return (
    <div className='music-page-container'>
    <h2>Trending</h2>
    {
        links.map((item)=>{
           return <p>Hi</p>
        })
    }
    </div>
  )
}

export default Trending