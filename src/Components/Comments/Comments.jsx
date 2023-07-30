import { useState, useEffect} from 'react';
import { AiTwotoneLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { db, auth } from '../../Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Comments({ postId, commentState }) {
  const [commentLiked, setCommentLiked] = useState(false);
  const [user] = useAuthState(auth);
  const [commentDots, setCommentDots] = useState('.');
  const [newComment, setNewComment] = useState('');

  useEffect(
    ()=>{

    },[])



  function addNewComment(e){
    e.preventDefault();
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
          autoClose: 2000,
        });
        setNewComment('');
    }).catch((err)=> console.log(err));
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
        (commentState? (<form onSubmit={addNewComment}><input type="text" placeholder={`Leave Hippo a comment${commentDots}`} onChange={(e)=> setNewComment(e.target.value)} value={newComment}/> </form>) : (null))
        :
        (<p id="error-login">Please Login To Comment!</p>)
        }
      <p>
        <span>Hippo Jr:</span>
        <span id="comment-section-like-icon">
          hello hello hello hello hello hello hello hello hello
          {commentLiked ? (
            <AiTwotoneLike
              id="liked-comment-icon"
              onClick={() => setCommentLiked(!commentLiked)}
            />
          ) : (
            <AiOutlineLike
              id="unliked-comment-icon"
              onClick={() => setCommentLiked(!commentLiked)}
            />
          )}
        </span>
      </p>
    </div>
  );
}

export default Comments;
