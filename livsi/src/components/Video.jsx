import React from "react";
import { useNavigate } from "react-router-dom";
import "./Video.css";

const Video = ({videoId, title, description, videoUrl, sido, sigungu }) => {
    const nav = useNavigate()

    const toShort = () => {
        nav(`/short/#${videoId}`)
    }

    return (
        <div className="video-container" onClick={toShort}>
            <video src={videoUrl} className="video-item"></video>
        </div>
    )
}

export default Video