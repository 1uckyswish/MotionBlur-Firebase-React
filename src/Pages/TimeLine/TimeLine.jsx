//*import  components
import React from 'react'
import SinglePost from '../../Components/SinglePost/SinglePost'
import "./TimeLine.css"
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';

function TimeLine() {
  const {allPosts, isYouTubeLink} = useContext(FirebaseData);
  console.log(allPosts)
  return (
    <div className='timeline-container'>
        <h2>Photos</h2>
        {
        allPosts.map((item)=>{
          if(isYouTubeLink(item?.MediaUrl)){
             return null
          }else{
            return <SinglePost image={item?.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption} id={item?.id} userId={item.UserId}/>;
          }
        })
      }
    </div>
  )
}

export default TimeLine
