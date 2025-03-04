import React from 'react'

export default function Follow() {
    return (
        <>
            <button onClick={handleFollow} className={`follow-button ${isFollowing ? "unfollow" : "follow"}`}>
                {isFollowing ? "フォロー解除" : "フォロー"}
            </button>
        </>
    )
}
