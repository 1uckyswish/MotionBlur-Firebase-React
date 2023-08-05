//*import  components
import React, {useState, useEffect} from 'react';
import './MusicPost.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineComment, AiOutlineMore} from "react-icons/ai";
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import PostLikes from '../PostLikes/PostLikes';
import { db } from '../../Config/FirebaseConfig';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { auth } from '/src/Config/FirebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';



function MusicPost({post, userName, date, caption, id, userId}) {
    const [followed, setFollowed] = useState(false);
    const navigate = useNavigate();
    const [commentCount, setCommentCount] = useState(0);
     const [user] = useAuthState(auth);
     const [defaultImage, setDefaultImage] = useState(true)

     const [pfpImage, setPfpImage] = useState("");
     const [errorImage, setErrorImage] = useState("https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg")
    
const storage = getStorage();
const pathReference = ref(storage, `ProfileImages/`);
listAll(pathReference)
  .then((result) => {
    // result.items contains an array of references to the files in the 'ProfileImages/' folder
    result.items.forEach((itemRef) => {
      // Get the download URL for each image
      getDownloadURL(itemRef)
        .then((url) => {
          // Check if the URL contains the user's UID
          if (url.includes(user.uid)) {
            // Use the 'url' to display or manipulate the image
            setPfpImage(url)
            setDefaultImage(false)
            console.log(url);
          }else if(url.includes(userId)){
            setErrorImage(url)
            console.log("error", url)
            setDefaultImage(false)
          }
        })
        .catch((error) => {
          console.error('Error getting download URL:', error);
        });
    });
  })
  .catch((error) => {
    console.error('Error listing items in folder:', error);
  });




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
    <div className='music-container'>
        <div className='music-header'>
            {
                defaultImage?
                <img src='https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg' />
                :
                <img src={
                user.uid === userId?
                pfpImage
                :
                user.uid !== userId?
                errorImage
                :
                'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-400-205577532.jpg'
                } alt='profileImg'/>
            }
                <div className='music-info'>
                    <div className='username-box'>
                        <h3 onClick={()=>navigate(`/ProfileAccount/${userId}`)}>{userName}</h3>
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
                <PostLikes postId={id} />
                <AiOutlineComment onClick={()=>navigate(`/PostDetails/${id}`)} id='comment-icon'/>
                {
                    commentCount?
                    <p className='comment-count'>{commentCount}</p>
                    :
                    null
                    }
            </div>
            {/* {
                followed?
                 <p id='follow-button' onClick={()=> setFollowed(!followed)}>Unfollow</p>
                 :
                <p onClick={()=> setFollowed(!followed)}>Follow</p>
            } */}
        </div>
    </div>
  );
}

export default MusicPost;
