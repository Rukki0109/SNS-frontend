import { MoreVert } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import "./Post.css"
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
// import { Users } from "../../dummyData"
export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            // const res = await axios.get(`/users/${post.userId}`);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users?userId=${post.userId}`);
            // const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
            // console.log(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const handleLike = async () => {
        try {
            //いいねのAPIを叩く
            await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id })
        } catch (err) {
            console.log(err);
        }


        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    // コメント用
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`/comments/${post._id}`);
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    

    const handleCommentSubmit = async () => {
        if (commentText.trim() === "") return;
        try {
            await axios.post("/comments", {
                postId: post._id,
                userId: currentUser._id,
                text: commentText
            });
            setCommentText("");
            fetchComments(); // コメント再取得
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post._id]);

    

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={
                                user.profilePicture
                                    ? PUBLIC_FOLDER + user.profilePicture
                                    : PUBLIC_FOLDER + "/person/noAvatar.png"}
                                alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>

                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={PUBLIC_FOLDER + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={PUBLIC_FOLDER + "/heart.png"} alt="" className="likeIcon" onClick={() => handleLike()} />
                        <span className="postLikeCounter">{like}人がいいねしました</span>
                    </div>
                    <div className="postBottomRight">
                        <span
                            className="postCommentText"
                            style={{ cursor: "pointer", textDecoration: "underline" }}
                            onClick={() => setShowCommentBox(!showCommentBox)}
                        >
                            コメント
                        </span>
                    </div>

                </div>
                {/* コメントボックス */}
                {showCommentBox && (
                    <div className="commentBox" style={{ marginTop: "10px" }}>
                        <div className="commentInput">

                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="コメントを入力..."
                                style={{ width: "80%", marginRight: "10px" }}
                            />
                            <button onClick={handleCommentSubmit}>送信</button>
                        </div>

                        <div className="commentsList" style={{ marginTop: "10px" }}>
                            {comments.map((c, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <img
                                        src={
                                            c.userId?.profilePicture
                                                ? PUBLIC_FOLDER + c.userId.profilePicture
                                                : PUBLIC_FOLDER + "/person/noAvatar.png"
                                        }
                                        alt=""
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            marginRight: "10px",
                                        }}
                                    />
                                    <div>
                                        <strong>{c.userId?.username || "名無し"}</strong>
                                        <p style={{ margin: "2px 0" }}>{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
