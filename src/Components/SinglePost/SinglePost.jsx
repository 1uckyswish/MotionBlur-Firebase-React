//*import  components
import React, {useState}from 'react'
import './SinglePost.css'
import { AiOutlineComment, AiOutlineHeart, AiFillHeart} from "react-icons/ai";

function SinglePost({image}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);


  return (
    <div className='post-container'>
        <div className='post-header'>
            <img src='https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' alt='profileImg'/>
                <div className='post-info'>
                    <h3>Thomas O'Malley Cat</h3>
                    <p>July 4th 2023</p>
                </div>
        </div>
        <div className='post-caption'>
            <p>"Embracing every moment of this wild ride called life! 🎉💫 YOLO, right? 😜 Taking selfies and capturing memories along the way. ✨ #YOLOLife #LiveInTheMoment #SelfieTime #MemoriesForLife"</p>
        </div>
        <div className="post-image">
            <img src={image} alt='postimage'/>
        </div>
        <div className="post-social">
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
  )
}

export default SinglePost