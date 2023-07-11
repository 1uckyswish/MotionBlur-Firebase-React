import React, {useState}from 'react'
import './SinglePost.css'
import { SlLike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";

function SinglePost() {
    const [liked, SetLiked] = useState(true);
    const [followed, setFollowed] = useState(false);


  return (
    <div className='post-container'>
        <div className='post-header'>
            <img src='https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' alt='profileImg'/>
                <div className='post-info'>
                    <h3>Thomas O'Malley Cat</h3>
                    <p>July 16th 2023</p>
                </div>
        </div>
        <div className='post-caption'>
            <p>Cat-ivating my hoomans with my purr-sonality and pawsome sense of humor! 😸🎭 Just a whisker away from my next mischief. Stay tuned for some feline-fueled comedy and fur-tastic adventures! #CattitudeOnPoint #PawsitivelyPurrfect #MeowAndLaughs</p>
        </div>
        <div className="post-image">
            <img src='https://images.unsplash.com/photo-1490481920145-fc78891bbb99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='postimage'/>
        </div>
        <div className="post-social">
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
  )
}

export default SinglePost