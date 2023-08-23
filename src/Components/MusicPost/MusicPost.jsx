//*import  components
import React, {useState, useEffect, useContext} from 'react';
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
import { FirebaseData } from '../../Context/FirebaseContext';
import { TbMessage } from "react-icons/tb";



function MusicPost({post, userName, date, caption, id, userId}) {
    // const [followed, setFollowed] = useState(false);
    const navigate = useNavigate();
    const [commentCount, setCommentCount] = useState(0);
    // const [user] = useAuthState(auth);
    const [defaultImage, setDefaultImage] = useState(true)
    const [pfpImage, setPfpImage] = useState("");
    const [otherUserPfp, setOtherUserPfp] = useState("https://i.seadn.io/gae/y2QcxTcchVVdUGZITQpr6z96TXYOV0p3ueLL_1kIPl7s-hHn3-nh8hamBDj0GAUNAndJ9_Yuo2OzYG5Nic_hNicPq37npZ93T5Nk-A?auto=format&dpr=1&w=1000")
    const {allPosts} = useContext(FirebaseData);
    const foundUser = allPosts.filter((item) => item.UserId === userId);

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
          if (url.includes(foundUser[0].id)) {
            // Use the 'url' to display or manipulate the image
            setPfpImage(url)
            setDefaultImage(false)
            console.log(url);
          }else if(url.includes(userId)){
            setOtherUserPfp(url)
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
           <div className='user-image'>
             {defaultImage ? (
        <img
          src="https://cdn.dribbble.com/users/2609408/screenshots/6902542/rainbow-loader.gif"
          alt="Default Avatar"
        onClick={()=>navigate(`/ProfileAccount/${userId}`)}/>
      ) : (
        <img
          src={foundUser[0].id === userId ? pfpImage : otherUserPfp}
          alt="User Profile"
        onClick={()=>navigate(`/ProfileAccount/${userId}`)}/>
      )}
      </div>
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
            <ReactPlayer url={post} controls width="90%" height="500px"/>
        </div>
        <div className="music-social">
            <div className='card-social-icons'>
                <PostLikes postId={id} />
                <TbMessage onClick={()=>navigate(`/PostDetails/${id}`)} id='comment-icon'/>
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
