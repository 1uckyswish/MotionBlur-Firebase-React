import {useState, useEffect} from 'react';
import "./AdGrid.css";
import { adData } from '../../Utils/data';

function AdGrid() {
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoverIndex((hoverIndex + 1) % adData.length);
    }, 2000);

    return () => clearTimeout(timer);
  }, [hoverIndex]);

  console.log(adData[0].Image)

  return (
    <div className="container">
    {adData.map((ad, index) => (
      <div
        key={index}
        className={`ad-box ${ad.className} ${index === hoverIndex ? 'active' : ''}`}
        style={{
          backgroundImage: `url(${ad.Image})`, // Set the background image unconditionally
        }}
      >
        <h2 className={`hidden-h2 ${index === hoverIndex ? 'active' : ''}`}>{ad.title}</h2>
        <p className={`hidden-p ${index === hoverIndex ? 'active' : ''}`}>{ad.description}</p>
      </div>
    ))}
  </div>
  );
}

export default AdGrid;
