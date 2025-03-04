import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

export default function Follow({ userId }) {
    const { user } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (!user || !user._id) return;  // `user` が `null` の場合に実行しない
    
        const checkFollowStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users?userId=${userId}`);
                setIsFollowing(response.data.followers.includes(user._id));
            } catch (error) {
                console.error("❌ フォロー状態の取得に失敗:", error.response?.data || error.message);
            }
        };
        checkFollowStatus();
    }, [userId, user]);  // `user` を依存配列に追加
    

    const handleFollow = async () => {
        if (!user || !user._id) return;  // `user` の存在チェック
    
        try {
            const url = isFollowing
                ? `${process.env.REACT_APP_API_URL}/users/${userId}/unfollow`
                : `${process.env.REACT_APP_API_URL}/users/${userId}/follow`;
    
            const response = await axios.put(url, { userId: user._id });
            console.log("✅ フォローAPIレスポンス:", response.data);
    
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error("❌ フォロー処理に失敗:", error.response?.data || error.message);
        }
    };
    

    return (
        <button onClick={handleFollow} className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}>
            {isFollowing ? "フォロー解除" : "フォロー"}
        </button>
    );
}
