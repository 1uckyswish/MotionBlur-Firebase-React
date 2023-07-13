import React, {useState} from 'react';
import './MusicPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";

function MusicPost() {
    const [liked, SetLiked] = useState(true);
    const [followed, setFollowed] = useState(false);
  return (
    <div className='music-container'>
        <div className='music-header'>
            <img src='https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' alt='profileImg'/>
                <div className='music-info'>
                    <h3>Thomas O'Malley Cat</h3>
                    <p>July 16th 2023</p>
                </div>
        </div>
        <div className='music-caption'>
            <p>Cat-ivating my hoomans with my purr-sonality and pawsome sense of humor! 😸🎭 Just a whisker away from my next mischief. Stay tuned for some feline-fueled comedy and fur-tastic adventures! #CattitudeOnPoint #PawsitivelyPurrfect #MeowAndLaughs</p>
        </div>
        <div className="music-image">
           <div class="ratio ratio-16x9">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/TOGswC4X8Nc?start=278" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        </div>
        <div className="music-social">
            <div className='social-icons'>
                {
                    liked?
                    <SlLike id='liked-icon' onClick={()=> SetLiked(!liked)}/>
                    :
                    <SlLike onClick={()=> SetLiked(!liked)}/>
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
