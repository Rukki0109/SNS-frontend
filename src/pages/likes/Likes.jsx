import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../compornents/topbar/Topbar';
import Sidebar from '../../compornents/sidebar/Sidebar';
import Rightbar from '../../compornents/rightbar/Rightbar';
import "./Likes.css"
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';
import Post from '../../compornents/post/Post';

export default function Likes() {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/likes/${user._id}`)
            setPosts(response.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt);
            }));
        }
        fetchPosts();
    }, [user._id]);
    return (
        <>
            <Topbar />
            <div className="Likes">
                <Sidebar />
                <div className='LikesRight'>
                    <div className="LikesResults">

                        {posts.map((post) => (
                            <Post post={post} key={post._id} />
                        ))}
                    </div>
                    <Rightbar />
                </div>
            </div>
        </>
    );

}
