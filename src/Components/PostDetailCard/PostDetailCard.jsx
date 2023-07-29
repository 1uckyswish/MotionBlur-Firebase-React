import React, {useState, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PostDetailCard.css"
import { AiOutlineComment, AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import ReactPlayer from 'react-player';

function PostDetailCard({post, userName, date, caption, id}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);

    function isYouTubeLink(link) {
        // Regular expression to match YouTube URLs
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/).+/;
        return youtubeRegex.test(link);
    }
  return (
    <div className='post-detail-container'>
        <div className="post-detail-image">
          {
        isYouTubeLink(post) ? (
          <ReactPlayer url={post} controls />
        ) : (
          <img src={post} alt='postimage' />
        )
      }
        </div>
        <div className='post-detail-header'>
            {/* <img src='https://images.unsplash.com/photo-1551847812-f815b31ae67c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80' alt='profileImg'/> */}
                <div className='post-detail-info'>
                  <div className='username-info-date'>
                    <h3>{userName}</h3>
                     {/* <p>{date}</p> */}
                      <div className='like-follow-info'>
                    {
                    liked?
                    <AiFillHeart id='liked-icon' onClick={()=> SetLiked(!liked)}/>
                    :
                    <AiOutlineHeart id='unliked-icon' onClick={()=> SetLiked(!liked)}/>
                    }
                    {
                    followed?
                    <p id='follow-user-button' onClick={()=> setFollowed(!followed)}>Unfollow</p>
                    :
                    <p id='follow-user-button' onClick={()=> setFollowed(!followed)}>Follow</p>
                    }
                    </div>
                   </div>
                </div>
        </div>
        <div className='post-detail-caption'>
            <p>{caption}</p>
        </div>
        <div className="post-detail-social">
            <div className='social-icons'>
                <AiOutlineComment/>
                <p>Add Comment?</p>
            </div>
        </div>
    </div>
  );
}

export default PostDetailCard
