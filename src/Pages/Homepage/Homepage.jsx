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
