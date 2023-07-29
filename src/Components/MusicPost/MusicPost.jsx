//*import  components
import React, {useState} from 'react';
import './MusicPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineComment, AiOutlineHeart, AiFillHeart, AiOutlineMore} from "react-icons/ai";
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

function MusicPost({post, userName, date, caption, id}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);
    const navigate = useNavigate();
  return (
    <div className='music-container'>
        <div className='music-header'>
            <img src='https://images.unsplash.com/flagged/photo-1557286249-08f5bc2ef21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='profileImg'/>
                <div className='music-info'>
                    <div className='username-box'>
                        <h3>{userName}</h3>
                        <AiOutlineMore id="more-icon" onClick={()=>navigate(`/PostDetails/${id}`)}/>
                    </div>
                    <p>{date.toDate().toDateString()}</p>
                </div>
        </div>
        <div className='music-caption'>
           <p>{caption}</p>
        </div>
        <div className="music-image">
            <ReactPlayer url={post} controls/>
        </div>
        <div className="music-social">
            <div className='card-social-icons'>
                {
                    liked?
                    <AiFillHeart id='liked-heart-icon' onClick={()=> SetLiked(!liked)}/>
                    :
                    <AiOutlineHeart onClick={()=> SetLiked(!liked)}/>
                }
                <AiOutlineComment onClick={()=>navigate(`/PostDetails/${id}`)}/>
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
