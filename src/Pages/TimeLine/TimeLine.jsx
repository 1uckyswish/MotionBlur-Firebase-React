//*import  components
import React from 'react'
import SinglePost from '../../Components/SinglePost/SinglePost'
import "./TimeLine.css"
import { useContext } from 'react';
import { FirebaseData } from '../../Context/FirebaseContext';

function TimeLine() {
  const {allPosts, isYouTubeLink} = useContext(FirebaseData);
  const imageArray = [
  'https://images.unsplash.com/photo-1606406054219-619c4c2e2100?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  'https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1536909526839-8f10e29ba80c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/flagged/photo-1579632993381-847f6a71a3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1542704792-e30dac463c90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
];

  return (
    <div className='timeline-container'>
        <h2>Photos</h2>
        {
        allPosts.map((item)=>{
          if(isYouTubeLink(item?.MediaUrl)){
             return null
          }else{
            return <SinglePost image={item?.MediaUrl} userName={item?.CreatedBy} date={item?.CreatedAt} caption={item?.Caption} />;
          }
        })
      }
    </div>
  )
}

export default TimeLine
