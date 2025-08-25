import React from "react";
import { useNavigate } from "react-router-dom";
import "./Video.css";

const Video = ({title, description, videoUrl, sido, sigungu }) => {
    const nav = useNavigate()

    const toShort = () => {
        nav(`/short/#/${videoUrl}`)
    }

    return (
        <div className="video-container" onClick={toShort}>
            {/* 영상 넣기 */}
            <video src={videoUrl} className="video"></video>
        </div>
    )
}

export default Video