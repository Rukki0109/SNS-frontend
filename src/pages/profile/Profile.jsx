import React, { useEffect, useState } from 'react'
import Topbar from '../../compornents/topbar/Topbar';
import Sidebar from '../../compornents/sidebar/Sidebar';
import Timeline from '../../compornents/timeline/Timeline';
import Rightbar from '../../compornents/rightbar/Rightbar';
import Follow from '../../compornents/follow/Follow';
import "./Profile.css"
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const{myuser} = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?username=${username}`);
            // console.log(response);
            setUser(response.data);
        }
        fetchUser();
    }, []);

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
                        </div>
                    </div>
                    <div className="profileInfo">
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                        {/* 自身のプロフィールページではない場合のみ <Follow /> を表示 */}
                        {(user.username !== myuser.username) && <Follow />}
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
