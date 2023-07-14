//Import components
import React, { useState, useEffect } from 'react';
import AdGrid from '../../Components/AdGrid/AdGrid';
import './Homepage.css';
import { Banner } from '/src/Utils/data';

function Homepage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (index >= Banner.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 7000);
  }, [index]);

  const bannerStyles = {
    backgroundImage: `url("${Banner[index].image}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    height: '55vh',
    opacity: 1,
    transition: 'background-image 20s ease-in-out background-position 9s ease-in-out, opacity 0.5s ease-in-out',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'black',
    // filter: 'brightness(80%)',
  };

  return (
    <section>
      <div className='banner' style={bannerStyles}>
        <div className='banner-header'>
          <h2>Unleash Your Creativity with Motion Blurr</h2>
        </div>
      </div>
      <AdGrid />
    </section>
  );
}

export default Homepage;
