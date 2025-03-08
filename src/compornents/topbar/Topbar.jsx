import { Chat, Notifications, Search } from '@mui/icons-material';
import React, { useContext, useState } from 'react'
import "./Topbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../state/AuthContext"

export default function Topbar() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            navigate(`/search?q=${query}`);
        }
    };

    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                    <span className="logo">Furugiya 3</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon' />
                    <input className='searchInput'
                        type="text"
                        placeholder="投稿を検索..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleSearch}  // Enterキーで検索
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarItemIcons">
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "/person/noAvatar.png"} alt="" className="topbarImg" />
                    </Link>

                </div>
            </div>
        </div>
    );
}
