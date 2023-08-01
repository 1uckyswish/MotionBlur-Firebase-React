import React, {useState, useEffect} from 'react'
import "./PostLikes.css"
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import { auth, db} from '../../Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc} from 'firebase/firestore';
import { toast } from 'react-toastify';


function PostLikes({postId}) {
  const [liked, SetLiked] = useState(false);
  const [user] = useAuthState(auth);
  const [likedCount, setLikedCount] = useState(0);

  //* check if the user has liked it... if not then set it to unliked
  useEffect(
    ()=>{
      //* figure out if the user liked the article
      const likesRef = collection(db, 'Likes');
      //* check if user is logged in
      if(user){
        //* make query to see if we liked this article
        const q = query(likesRef, where('PostId', '==', postId), where('UserId', '==', user?.uid));
        //* look for a macthing document 
        getDocs(q, likesRef)
        .then((res)=>{
          //* is there a match?
          if(res.size > 0){
            SetLiked(true);
          }
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
      }else{
        SetLiked(false);
      }
    },[user]);

    //* check the length of the liked comments

    useEffect(
      ()=>{
         //* figure out if the user liked the article
        const likesRef = collection(db, 'Likes');
        //* make a query to count likes
        const q2 = query(likesRef, where('PostId', '==', postId));
        //* fetch for matching comments with a length
        getDocs(q2, likesRef)
        .then((res)=>{
          setLikedCount(res.size);
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
      },[liked])



  const handleLikedPost = ()=>{
    if(user){
      //* create reference to likes collection
      //* will create a collection if it does not exist
      const likesRef = collection(db, 'Likes');
      //* adding document with this post id and user id
      addDoc(likesRef, {
        UserId: user?.uid,
        PostId: postId,
      })
      .then((res)=>{
        // dont need the promise res
        SetLiked(true)
        toast.info('Post Liked!', {
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
    }
  };




  const handleUnlikePost = ()=>{
    if(user){
      //*user?.uid
      //*postId
      //* need to find the post with the post id and user id to get its liked ID
      const likesRef = collection(db, 'Likes');
      //* make a query to get the id for us to delete
      const q = query(likesRef, where('PostId', '==', postId), where('UserId', '==', user?.uid));
      //* get a correct match
      getDocs(q, likesRef).then((res)=>{
        const likeId = res.docs[0].id;
        //* delete this doc from likes collection
        deleteDoc(doc(db, 'Likes', likeId))
        .then((result)=>{
          SetLiked(false)
          toast.warn('Post UnLiked!', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          color: "black",
        });
        })
      }).catch((error)=>{
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

    }
  };


  return (
    <div>
       {
        liked?
        <AiFillHeart id='liked-icon' onClick={handleUnlikePost}/>
        :
        <AiOutlineHeart id='unliked-icon' onClick={handleLikedPost}/>
        }
        <span>
          {
          likedCount?
          likedCount
          : null
          }
          </span>
    </div>
  )
}

export default PostLikes
