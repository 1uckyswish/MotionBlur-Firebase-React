import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PostDetailCard.css"
import { AiOutlineComment, AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import ReactPlayer from 'react-player';

function PostDetailCard({post, userName, date, caption, id}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);
  return (
    <div className='music-container'>
        <div className="music-image">
            <ReactPlayer url={post} controls/>
        </div>
        <div className='music-header'>
            {/* <img src='https://images.unsplash.com/photo-1551847812-f815b31ae67c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80' alt='profileImg'/> */}
                <div className='music-info'>
                    <h3>{userName}</h3>
                    {
                followed?
                 <p id='follow-button' onClick={()=> setFollowed(!followed)}>Unfollow</p>
                 :
                <p onClick={()=> setFollowed(!followed)}>Follow</p>
            }
                    <p>{date}</p>
                    {
                    liked?
                    <AiFillHeart id='liked-icon' onClick={()=> SetLiked(!liked)}/>
                    :
                    <AiOutlineHeart onClick={()=> SetLiked(!liked)}/>
                    }
                </div>
        </div>
        <div className='music-caption'>
            <p>{caption}</p>
        </div>
        <div className="music-social">
            <div className='social-icons'>
                <AiOutlineComment/>
            </div>
        </div>
    </div>
  );
}

export default PostDetailCard