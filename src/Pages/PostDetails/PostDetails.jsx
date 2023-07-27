import {useEffect, useState} from 'react';
import "./PostDetails.css";
import { useParams } from 'react-router-dom';

function PostDetails() {
    const {PostId} = useParams()
  return (
    <div>PostDetails {PostId}</div>
  )
}

export default PostDetails