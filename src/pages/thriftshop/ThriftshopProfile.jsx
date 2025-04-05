import React, { useEffect, useState } from 'react';
import Topbar from '../../compornents/topbar/Topbar';
import Sidebar from '../../compornents/sidebar/Sidebar';
import Timeline from '../../compornents/timeline/Timeline';
import Rightbar from '../../compornents/rightbar/Rightbar';
import Post from '../../compornents/post/Post';
import "./Profile.css";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function ThriftshopProfile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { id } = useParams();
    const [shop, setShop] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resShop = await axios.get(`${process.env.REACT_APP_API_URL}/thriftshops/${id}`);
            setShop(resShop.data);

            const resPosts = await axios.get(`${process.env.REACT_APP_API_URL}/posts/shop/${id}`);
            setPosts(resPosts.data);
        };
        fetchData();
    }, [id]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={PUBLIC_FOLDER + "/promotion/thriftshop.jpg"} alt="" className="profileCoverImg" />
                            <img src={PUBLIC_FOLDER + shop.image} alt="" className="profileUserImg" />
                        </div>
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{shop.name}</h4>
                        <span className="profileInfoDesc">{shop.description}</span>
                        <p>所在地：{shop.location}</p>
                    </div>
                    <div className="profileRightBottom">
                        {/* Timeline コンポーネントを再利用するなら工夫が必要 */}
                        {posts.length === 0 ? (
                            <p>関連投稿はまだありません。</p>
                        ) : (
                            posts.map((post) => (
                                <Post key={post._id} post={post} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
