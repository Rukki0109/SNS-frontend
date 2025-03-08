import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from '../../compornents/topbar/Topbar';
import Sidebar from '../../compornents/sidebar/Sidebar';
import Post from '../../compornents/post/Post'
import "./search.css";
import Rightbar from "../../compornents/rightbar/Rightbar";

export default function Search() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q"); // URL から `q` を取得
    const [results, setResults] = useState([]);


    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            try {
                const response = await fetch(`/posts/search?q=${query}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("検索エラー:", error);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <>
            <Topbar />
            <div className="search">
                <Sidebar />
                <div className="searchRight">
                    <div className="searchResults">
                        {results.length > 0 ? (
                            results.map((post) => (
                                <div key={post._id} className="searchResultItem">
                                    <Post post={post} key={post._id} />
                                </div>
                            ))
                        ) : (
                        <p>該当する投稿がありません</p>
                        )}
                    </div>
                    <Rightbar />
                </div>
            </div>
        </>
    )
}
