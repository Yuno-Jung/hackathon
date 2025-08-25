import React, { useContext } from "react";
import "./VideoList.css";
import Video from "./Video";
import { useEffect, useRef, useState } from "react";
import axios from "../axios/axios"
import { livsiFunctionContext, livsistateContext } from "../App";


const VideoList = () => {

  const { onLoad } = useContext(livsiFunctionContext)
  const { Videos } = useContext(livsistateContext)
  
  const certiffiedVideos = (cartegories) => {
    return Videos.filter((video) => cartegories.includes(video));
  };

  return (
    <div className="video-list-container">
      <div className="video-list">
        {Videos.map((video, index) => (
          <Video 
          key={index}
          videoId={video.videoId} 
          title={video.title} 
          description={video.description} 
          videoUrl={video.videoUrl} 
          sido={video.sido}
          sigungu={video.sigungu}
          />
          ))}
        {/* <button onClick={onLoad}>로드버튼</button>
        <button onClick={chack}>체크버튼</button> */}
      </div>
    </div>
  );
};

export default VideoList;
