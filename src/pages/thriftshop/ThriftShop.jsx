import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ThriftShop() {
  const { id } = useParams(); // URLの:id
  const [shop, setShop] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchShop = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/thriftshops/${id}`);
      setShop(res.data);
    };

    const fetchPosts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/posts/shop/${id}`);
      setPosts(res.data);
    };

    fetchShop();
    fetchPosts();
  }, [id]);

  if (!shop) return <div>読み込み中...</div>;

  return (
    <div className="thriftshop-profile">
      <h2>{shop.name}</h2>
      <p>{shop.location}</p>
      <p>{shop.description}</p>
      {shop.image && <img src={process.env.REACT_APP_PUBLIC_FOLDER + shop.image} alt="shop" style={{ maxWidth: "300px" }} />}
      
      <h3>この古着屋に関連する投稿</h3>
      {posts.length === 0 ? (
        <p>投稿はまだありません</p>
      ) : (
        posts.map(post => (
          <div key={post._id}>
            <p>{post.desc}</p>
            {post.img && <img src={post.img} alt="投稿画像" style={{ maxWidth: "200px" }} />}
          </div>
        ))
      )}
    </div>
  );
}
