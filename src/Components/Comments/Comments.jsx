import { useState, useEffect} from 'react';
import { AiTwotoneLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { db, auth } from '../../Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getDocs, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import "./Comments.css"
import { useNavigate } from 'react-router-dom';



function Comments({ postId, commentState, userName}) {
  const [commentLiked, setCommentLiked] = useState(false);
  const [user] = useAuthState(auth);
  const [commentDots, setCommentDots] = useState('.');
  const [newComment, setNewComment] = useState('');
  const [arrayOfComments, setArrayOfComments] = useState([]);
  const nav = useNavigate();

  useEffect(
    ()=>{
      //* get a reference to comments collection database
       const commentsRef = collection(db, 'Comments');

      //! filter to show only comments for one specific article
      const q = query(commentsRef, where('PostId', '==', postId))

      //* then use a promise to get the comments
      onSnapshot(q,(snapshot)=>{
        const comments = snapshot.docs.map((item)=>({
          ...item.data(),
          id: item.id,
        }));
        setArrayOfComments(comments);
      });
    },[])


  function addNewComment(e){
    e.preventDefault();
     if (newComment.length <= 5) {
      toast.error('Enter a comment greater than 5 characters', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    // You can show an error message here, or prevent the comment from being posted
    return;
  }
    //need to make a document in comments collection in the db
    //include the newComment,  the post id and the user who added the comment
    // create a reference to the Comments
    // will create a collection if it doe not exist
    const commentsRef = collection(db, 'Comments');
    // adding a document with all the data
    addDoc(commentsRef, {
        UserId: user?.uid,
        PostId: postId,
        Content: newComment,
        UserName: user?.displayName,
    })
    .then(res=>{
         toast("Comment Posted!", {
          type: "success",
          autoClose: 1000,
        });
        setNewComment('');
    }).catch((err)=> console.log(err));
  }

  const deleteComment = id =>{
    //* get the specific id of the post
    deleteDoc(doc(db, 'Comments', id))
    .then((success)=>{
      toast.info("Comment Deleted!", {
          autoClose: 1000,
        });
    })
    .catch((error)=>{

    })
  }

   setTimeout(() => {
      setCommentDots(commentDots + ".")
      if(commentDots.length >= 3){
        setCommentDots(".")
      }
    }, 1000);

  return (
    <div>
        {
        user?
        (commentState? (<form onSubmit={addNewComment}><input type="text" placeholder={`Leave ${userName} a comment${commentDots}`} onChange={(e)=> setNewComment(e.target.value)} value={newComment}/> </form>) : (null))
        :
        (<p id="error-login">Please <span id="error-login-text" onClick={()=>nav('/SignUp')}>Login</span> To Comment!</p>)
        }
         {
          arrayOfComments.map((item)=>{
            return (
            <p key={item?.id}>
            <span>{item.UserName}:</span>
            <span id="comment-section-like-icon">{item.Content}
            {
              // comment has a uid
              // compare to see if I can delete a Comment
              user?.uid === item?.UserId?
              (<button id="comment-delete" onClick={()=>deleteComment(item.id)}>Delete</button>)
              :
              commentLiked?
              (<AiTwotoneLike id="liked-comment-icon" onClick={() => setCommentLiked(!commentLiked)} />)
              :
              (<AiOutlineLike id="unliked-comment-icon" onClick={() => setCommentLiked(!commentLiked)} />)
            }
            </span>
            </p>)
          })
        }
    </div>
  );
}

export default Comments;
