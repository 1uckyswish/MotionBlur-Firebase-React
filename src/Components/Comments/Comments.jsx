import React, { useState, useEffect } from 'react';
import { AiTwotoneLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { db, auth } from '../../Config/FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import "./Comments.css"
import { useNavigate } from 'react-router-dom';

function Comments({ postId, commentState, userName }) {
  const [commentLiked, setCommentLiked] = useState(false);
  const [user] = useAuthState(auth);
  const [commentDots, setCommentDots] = useState('.');
  const [newComment, setNewComment] = useState('');
  const [arrayOfComments, setArrayOfComments] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const commentsRef = collection(db, 'Comments');
    const q = query(commentsRef, where('PostId', '==', postId));
    onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      setArrayOfComments(comments);
    });
  }, []);

  const addNewComment = (e) => {
    e.preventDefault();
    if (newComment.length <= 1) {
      toast.error('Provide a valid input', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const commentsRef = collection(db, 'Comments');
    addDoc(commentsRef, {
      UserId: user?.uid,
      PostId: postId,
      Content: newComment,
      UserName: user?.displayName,
    })
      .then(res => {
        toast("Comment Posted!", {
          type: "success",
          autoClose: 1000,
        });
        setNewComment('');
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (id) => {
    deleteDoc(doc(db, 'Comments', id))
      .then((success) => {
        toast.info("Comment Deleted!", {
          autoClose: 1000,
        });
      })
      .catch((error) => {
        // Handle error here
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewComment(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCommentDots((prevDots) => prevDots.length >= 3 ? "." : prevDots + ".");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {user ?
        (commentState ? (
          <form onSubmit={addNewComment}>
            <textarea
              type="text"
              placeholder={`Leave ${userName} a comment${commentDots}`}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyPress}
              value={newComment}
            />
          </form>
        ) : (null))
        : (<p id="error-login">Please <span id="error-login-text" onClick={() => nav('/SignUp')}>Login</span> To Comment!</p>)
      }
      {arrayOfComments.map((item) => (
        <div key={item?.id}>
          <span onClick={() => nav(`/ProfileAccount/${item?.UserId}`)}>{item.UserName} :</span>
          <span id="comment-section-like-icon"><p>{item.Content}</p>
            {user?.uid === item?.UserId ? (
              <button id="comment-delete" onClick={() => deleteComment(item.id)}>Delete</button>
            ) : null}
          </span>
        </div>
      ))}
    </>
  );
}

export default Comments;
