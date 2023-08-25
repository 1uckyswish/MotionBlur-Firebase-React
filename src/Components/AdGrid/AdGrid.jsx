import {useState, useEffect} from 'react';
import Grid1 from "/assets/GridImgs/Image1.webp";
import Grid2 from "/assets/GridImgs/Image2.webp";
import Grid3 from "/assets/GridImgs/Image3.webp";
import Grid4 from "/assets/GridImgs/Image4.webp";
import Grid5 from "/assets/GridImgs/Image5.webp";
import Grid6 from "/assets/GridImgs/Image6.webp";
import "./AdGrid.css";

const adData = [
  {
    title: "About",
    description: "Unleash your creativity! Share passions through captivating visuals and soulful music. Experience art and sound seamlessly. Join us today!",
    className: "ad-box-1",
    Image: Grid1,
  },
  {
    title: "Discover",
    description: "Vibrant community of artists, photographers, music lovers, and dreamers.",
    className: "ad-box-2",
    Image: Grid2,
  },
  {
    title: "Collaborate",
    description: "Unleash your imagination, find inspiration, and ignite conversations that transcend boundaries.",
    className: "ad-box-3",
    Image: Grid3,
  },
  {
    title: "Like & Comment",
    description: "Ignite conversations with captivating content. Leave your mark through thought-provoking visuals and heart-pounding beats.",
    className: "ad-box-4",
    Image: Grid4,
  },
  {
    title: "Share Posts",
    description: "Unleash your voice! Comment, share, and make an impact. Spread your influence through conversation.",
    className: "ad-box-5",
    Image: Grid5,
  },
  {
    title: "Trending Posts",
    description: "Stay in the loop! Explore trending topics and be part of the buzz.",
    className: "ad-box-6",
    Image: Grid6,
  }
];

function AdGrid() {
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoverIndex((hoverIndex + 1) % adData.length);
    }, 2000);

    return () => clearTimeout(timer);
  }, [hoverIndex]);

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
