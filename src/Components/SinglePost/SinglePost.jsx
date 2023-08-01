//*import  components
import React, {useState, useEffect}from 'react'
import './SinglePost.css'
import { AiOutlineComment, AiOutlineHeart, AiFillHeart,AiOutlineMore} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import PostLikes from '../PostLikes/PostLikes';
import { db } from '../../Config/FirebaseConfig';
import { collection, getDocs, query, where} from 'firebase/firestore';


function SinglePost({image, userName, date, caption, id}) {
    const [liked, SetLiked] = useState(false);
    const [followed, setFollowed] = useState(false);
    const navigate = useNavigate();
    const [commentCount, setCommentCount] = useState(0);

    useEffect(
      ()=>{
         //* figure out if the user liked the article
        const commentLikes = collection(db, 'Comments');
        //* make a query to count likes
        const q2 = query(commentLikes, where('PostId', '==', id));
        //* fetch for matching comments with a length
        getDocs(q2, commentLikes)
        .then((res)=>{
          setCommentCount(res.size);
        })
        .catch((err)=>{
           toast.error('Error try again', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        })
      },[commentCount])


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
                 <PostLikes postId={id} />
                 <AiOutlineComment onClick={()=>navigate(`/PostDetails/${id}`)} id='comment-icon'/>
                  {
                    commentCount?
                    commentCount
                    :
                    null
                    }
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