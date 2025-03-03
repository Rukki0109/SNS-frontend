import React, { useContext, useEffect, useState } from 'react'
import "./Timeline.css"
import Share from '../share/Share'
import Post from '../post/Post'
import axios from "axios";
import { AuthContext } from '../../state/AuthContext';
//import {Posts} from "../../dummyData"

export default function Timeline( {username} ) {
  const [posts, setPosts] = useState([]);
  const{user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async()=>{
      const response = username 
      ? await axios.get(`/posts/profile/${username}`)
      : await axios.get(`/posts/timeLine/${user._id}`);
      // console.log(response);
      setPosts(response.data.sort((post1,post2)=>{
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      }));
    }
    fetchPosts();
  },[username, user._id]);

  return (
    <div className='timeline'>
      <div className="timelineWrapper">

        {/* 自身のプロフィールページの場合のみ <Share /> を表示 */}
        {(!username || username === user.username) && <Share />}
        
        {posts.map((post) => (
          <Post post = {post} key ={post._id}/>
        ))}
      </div>
    </div>
  )
}
