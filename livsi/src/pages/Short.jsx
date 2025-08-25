import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // react-router-dom 의존성 제거
import Header from "../components/Header"; // 이 컴포넌트 경로가 올바른지 확인해주세요.
import "./short.css"; // 이 CSS 파일 경로가 올바른지 확인해주세요.
import { livsistateContext } from "../App";

const ALL_VIDEOS = [
  { id: "A" },
  { id: "B" },
  { id: "C" },
  { id: "D" },
  { id: "E" },
  { id: "F" },
  { id: "G" },
  { id: "H" },
  { id: "I" },
  { id: "J" },
];

export default function Short() {
  const { Videos } = useContext(livsistateContext)

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchCounts, setWatchCounts] = useState(new Map());

  const containerRef = useRef(null);
  const startY = useRef(0);
  const endY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const getIdFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/")) {
        return hash.substring(2);
      }
      return hash.substring(1);
    };

    if (playlist.length === 0) {
      const idFromHash = getIdFromHash();
      const initialVideo = Videos.find((v) => v.videoUrl === idFromHash) || Videos[0];
      console.log(initialVideo)

      setPlaylist([{
        id: initialVideo.videoId,
        videourl: initialVideo.videoUrl
      }]);
      setWatchCounts(new Map([[initialVideo.videoId, 1]]));

      if (!idFromHash) {
        window.location.hash = initialVideo.videoId;
      }
    }
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && playlist[currentIndex].id) {
      const currentId = playlist[currentIndex].id;
      const currentHash = window.location.hash.substring(1);
      if (currentId !== currentHash) {
        window.location.hash = currentId;
      }
    }
  }, [currentIndex, playlist]);

  const videosToRender = useMemo(() => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(playlist.length, currentIndex + 2);
    return playlist.slice(start, end).map((id, index) =>({
      id,
      position: start + index,}
    ))
  }, [playlist, currentIndex])

  const handleSwipeUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSwipeDown = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      return;
    }

    let minWatchCount = Infinity;
    Videos.forEach((video) => {
      const count = watchCounts.get(video.videoUrl) || 0;
      if (count < minWatchCount) minWatchCount = count;
    });

    const leastWatchedVideos = Videos.filter(
      (video) => (watchCounts.get(video.videoUrl) || 0) === minWatchCount
    );
    const nextVideo = leastWatchedVideos[Math.floor(Math.random() * leastWatchedVideos.length)];

    setPlaylist((prev) => [...prev, {id: nextVideo.videoId, videourl: nextVideo.videoUrl}]);
    setWatchCounts((prev) =>
      new Map(prev).set(nextVideo.videoId, (prev.get(nextVideo.videoId) || 0) + 1)
    );
    setCurrentIndex((prev) => prev + 1);
  };

  const dragStart = (y) => {
    startY.current = y;
    isDragging.current = true;
    document.body.style.userSelect = "none";
  };
  const dragMove = (y) => {
    if (isDragging.current) endY.current = y;
  };
  const dragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.userSelect = "auto";
    if (startY.current - endY.current > 50) handleSwipeDown();
    else if (endY.current - startY.current > 50) handleSwipeUp();
  };

  const eventHandlers = {
    onTouchStart: (e) => dragStart(e.targetTouches[0].clientY),
    onTouchMove: (e) => dragMove(e.targetTouches[0].clientY),
    onTouchEnd: dragEnd,
    onMouseDown: (e) => dragStart(e.clientY),
    onMouseMove: (e) => dragMove(e.clientY),
    onMouseUp: dragEnd,
    onMouseLeave: dragEnd,
  };

  return (
    <div className="app-container">
      <Header />
      <div className="player-container">
        <div ref={containerRef} className="shorts-player" {...eventHandlers}>
          <div
            className="video-track"
            style={{ transform: `translateY(-${currentIndex * 100}%)` }}
          >
            {videosToRender.map(({ id, position }) => (
              <div
                key={`${id.id}-${position}`}
                className="video-slide"
                style={{
                  top: `${position * 100}%`,
                }}
              >
                <video 
                src={id.videourl} 
                className="video"
                autoPlay
                ></video>
                <span className="video-id">{id.id}</span>
              </div>
            ))}
          </div>
          <div className="info-overlay">
            <span className="sido"></span>
            <span className="sigungu"></span>
            <label htmlFor="comment-button">댓글</label>
            <button className="comment-button"></button>
            <label htmlFor="like-button">좋아요</label>
            <button className="like-button"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
