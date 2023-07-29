//*import  components
import React, {useState}from 'react'
import './SinglePost.css'
import { AiOutlineComment, AiOutlineHeart, AiFillHeart,AiOutlineMore} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function SinglePost({image, userName, date, caption, id}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);
    const navigate = useNavigate();


  return (
    <div className='post-container'>
        <div className='post-header'>
            <img src='https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' alt='profileImg'/>
                <div className='post-info'>
                     <div className='username-box'>
                        <h3>{userName}</h3>
                        <AiOutlineMore id="more-icon" onClick={()=>navigate(`/PostDetails/${id}`)}/>
                    </div>
                    <p>{date.toDate().toDateString()}</p>
                </div>
        </div>
        <div className='post-caption'>
            <p>{caption}</p>
        </div>
        <div className="post-image">
            <img src={image} alt='postimage'/>
        </div>
        <div className="post-social">
            <div className='card-social-icons'>
                {
                    liked?
                    <AiFillHeart id='liked-icon' onClick={()=> SetLiked(!liked)}/>
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
  )
}

export default SinglePost