import {useEffect, useState} from 'react';
import "./PostDetails.css";
import { useParams } from 'react-router-dom';
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';
import PostDetailCard from '../../Components/PostDetailCard/PostDetailCard';

function PostDetails() {
    const {PostId} = useParams();
    const [singlePostData, setSinglePostData] = useState([]);
    // const {isYouTubeLink} = useContext(FirebaseData);
  useEffect(
    ()=>{
      //* set up a single ref to a single PostDetails
      const docRef = doc(db, 'Posts', PostId);
      // * getting the document information with the id
      getDoc(docRef)
      .then((result)=>{
        setSinglePostData(result.data());
      })
      .catch((error)=>console.error("This is an ERROR!!!", error))
    },[PostId]
  );

  // Assuming singlePostData is defined and has a valid structure
  return (
    <div className='post-details-container'>
       <h2>Post Details</h2>
        <PostDetailCard post={singlePostData?.MediaUrl} userName={singlePostData?.CreatedBy}  date={singlePostData?.CreatedAt?.toDate().toDateString()} caption={singlePostData?.Caption} id={singlePostData?.id} postUrlId={PostId} UserId={singlePostData?.UserId}/>
    </div>
  )
}

export default PostDetails