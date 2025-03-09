import React, { useEffect, useState } from 'react'
import "./Rightbar.css"
import { Users } from "../../dummyData"
import Online from '../online/Online'
import axios from 'axios';
import Followings from '../followings/Followings';

export default function Rightbar({ userId }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [stats, setStats] = useState({ followers: 0, followings: 0, postCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/stats`);
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  }, [userId]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer">
          <img src="assets/star.png" alt="" className="starImg" />
          <span className="eventText">
            <b>フォロワー限定</b>イベント開催中！
          </span>
        </div>
        <img src="assets/ad.jpeg" alt="" className='eventImg' />
        {/* <h4 className="rightbarTitle">オンラインの友達</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul> */}
        <p className="promotionTitle">プロモーション広告</p>

        {/* 私のオリジナル洋服ブランド */}
        <a href="https://nishizawa.fashionstore.jp/" target="_blank" rel="noopener noreferrer">
          <img src={process.env.REACT_APP_PUBLIC_FOLDER + "/promotion/nishizawa.jpg"} alt="オリジナル洋服ブランド" className="rightbarPromotionImg" />
        </a>
        <p className="promotionName">私のオリジナル洋服ブランド</p>

        {/* GitHub アカウント */}
        <a href="https://github.com/Rukki0109" target="_blank" rel="noopener noreferrer">
          <img src={process.env.REACT_APP_PUBLIC_FOLDER + "/promotion/github-logo.png"} alt="GitHub" className="rightbarPromotionImg" />
        </a>
        <p className="promotionName">GitHubアカウント</p>

        {/* 自己紹介サイト */}
        <a href="https://rukki0109.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
          <img src={process.env.REACT_APP_PUBLIC_FOLDER + "/person/eye.jpg"} alt="自己紹介サイト" className="rightbarPromotionImg" />
        </a>
        <p className="promotionName">自己紹介サイト</p>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>ユーザー情報</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">投稿数:</span>
            <span className="rightbarInfoValue">{stats.postCount}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">フォロー中:</span>
            <span className="rightbarInfoValue">{stats.followings}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">フォロワー:</span>
            <span className="rightbarInfoValue">{stats.followers}</span>
          </div>
          <h4 className="rightbarTitle">友達</h4>
          <div className="rightbarFollowings">
            <Followings userId={userId} />

            {/* <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER + "/person/1.jpeg"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">tanaka</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER + "/person/2.jpeg"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">Yamaki</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER + "/person/3.jpeg"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">koga</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER + "/person/4.jpeg"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">Matukubo</span>
            </div>
            <div className="rightbarFollowing">
              <img src={PUBLIC_FOLDER + "/person/5.jpeg"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">Kikukawa</span>
            </div> */}
          </div>

        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {userId ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
