import React, { useEffect, useState } from 'react'
import Topbar from '../../compornents/topbar/Topbar';
import Sidebar from '../../compornents/sidebar/Sidebar';
import Timeline from '../../compornents/timeline/Timeline';
import Rightbar from '../../compornents/rightbar/Rightbar';
import "./Profile.css"
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const username = useParams().username;
    const currentUserId = "ログイン中のユーザーID";

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?username=${username}`);
            // console.log(response);
            setUser(response.data);
            if (response.data.followers.includes(currentUserId)) {
                setIsFollowing(true);
            }
        }
        fetchUser();
    }, [username, currentUserId]);

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}/unfollow`, { userId: currentUserId });
                setIsFollowing(false);
            } else {
                await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}/follow`, { userId: currentUserId });
                setIsFollowing(true);
            }
        } catch (err) {
            console("フォロー処理に失敗しました")
        }
    }

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"} alt="" className="profileCoverImg" />
                            <img src={
                                user.profilePicture
                                    ? PUBLIC_FOLDER + user.profilePicture
                                    : PUBLIC_FOLDER + "/person/noAvatar.png"}
                                alt="" className="profileUserImg" />
                            <button onClick={handleFollow} className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}>
                                {isFollowing ? "フォロー解除" : "フォロー"}
                            </button>
                        </div>
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                    <div className="profileRightBottom">
                        <Timeline username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}
