import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Followings.css";
import { Link } from "react-router-dom";

export default function Followings({ userId }) {
    const [followings, setFollowings] = useState([]);
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/followings`);
                setFollowings(res.data);
            } catch (err) {
                console.error("フォローリストの取得に失敗しました", err);
            }
        };

        if (userId) {
            fetchFollowings();
        }
    }, [userId]);

    return (
        <div className="followings">
            <h3 className="followingsTitle">フォロー中のユーザー</h3>
            <ul className="followingsList">
                {followings.map((friend) => (
                    <li key={friend._id} className="followingsItem">
                        <Link to={`/profile/${friend.username}`}>
                        <img src={
                                friend.profilePicture
                                    ? PUBLIC_FOLDER + friend.profilePicture
                                    : PUBLIC_FOLDER + "person/noAvatar.png"}
                                alt="" className="followingsImg" />
                        </Link>
                        <span className="followingsName">{friend.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}