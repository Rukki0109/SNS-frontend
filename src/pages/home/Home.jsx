import React from 'react'
import "./Home.css"
import Topbar from '../../compornents/topbar/Topbar';
import Sidebar from '../../compornents/sidebar/Sidebar';
import Timeline from '../../compornents/timeline/Timeline';
import Rightbar from '../../compornents/rightbar/Rightbar';

export default function Home() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Timeline />
                <Rightbar />
            </div>
        </>
    );

}
