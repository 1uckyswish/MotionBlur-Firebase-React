import React from 'react'
import SinglePost from '../../Components/SinglePost/SinglePost'
import "./TimeLine.css"

function TimeLine() {
    const array = [1,2,3,4,5]
  return (
    <div className='timeline-container'>
        <h2>TimeLine</h2>
        {
            array.map((item)=>{
                return  <SinglePost />
            })
        }
    </div>
  )
}

export default TimeLine
