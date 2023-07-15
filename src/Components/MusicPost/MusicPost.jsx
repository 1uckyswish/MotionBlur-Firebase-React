//*import  components
import React, {useState} from 'react';
import './MusicPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineComment, AiOutlineHeart, AiFillHeart} from "react-icons/ai";


function MusicPost({video}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);
  return (
    <div className='music-container'>
        <div className='music-header'>
            <img src='https://images.unsplash.com/flagged/photo-1557286249-08f5bc2ef21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='profileImg'/>
                <div className='music-info'>
                    <h3>Marvin Gaye</h3>
                    <p>July 5th 2023</p>
                </div>
        </div>
        <div className='music-caption'>
            <p>Stepping into the realm of my all-time favorite song, where every note is a masterpiece and every lyric holds a special place in my heart. The melody, the lyrics, and the emotions intertwine to create an extraordinary experience that never fails to captivate me. Sharing a piece of my musical passion with you all. 🎶✨ #FavoriteSong #MusicEnthusiast #MelodicMasterpiece #SongMagic #UnforgettableMoments #TimelessClassic #MemorableLyrics #IncredibleComposition</p>
        </div>
        <div className="music-image">
           <div class="ratio ratio-16x9">
            <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        </div>
        <div className="music-social">
            <div className='social-icons'>
                {
                    liked?
                    <AiFillHeart id='liked-icon' onClick={()=> SetLiked(!liked)}/>
                    :
                    <AiOutlineHeart onClick={()=> SetLiked(!liked)}/>
                }
                <AiOutlineComment/>
            </div>
            {
                followed?
                 <p id='follow-button' onClick={()=> setFollowed(!followed)}>Unfollow</p>
                 :
                <p onClick={()=> setFollowed(!followed)}>Follow</p>
            }
        </div>
    </div>
  );
}

export default MusicPost;
