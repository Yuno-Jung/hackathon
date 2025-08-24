import React, { useState, useMemo, useRef, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // react-router-dom 의존성 제거
import Header from "../components/Header"; // 이 컴포넌트 경로가 올바른지 확인해주세요.
import "./short.css"; // 이 CSS 파일 경로가 올바른지 확인해주세요.

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

const getColorById = (id) => {
  const charCode = id ? id.charCodeAt(0) : 0;
  const hue = (charCode * 30) % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

export default function Short() {
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
      const initialVideo =
        ALL_VIDEOS.find((v) => v.id === idFromHash) || ALL_VIDEOS[0];
      setPlaylist([initialVideo.id]);
      setWatchCounts(new Map([[initialVideo.id, 1]]));
      // URL이 비어있을 경우 초기 비디오 ID로 해시를 설정합니다.
      if (!idFromHash) {
        window.location.hash = initialVideo.id;
      }
    }
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && playlist[currentIndex]) {
      const currentId = playlist[currentIndex];
      const currentHash = window.location.hash.substring(1);
      if (currentId !== currentHash) {
        window.location.hash = currentId;
      }
    }
  }, [currentIndex, playlist]);

  const videosToRender = useMemo(() => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(playlist.length, currentIndex + 2);
    return playlist.slice(start, end).map((id, index) => ({
      id,
      position: start + index,
    }));
  }, [playlist, currentIndex]);

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
    ALL_VIDEOS.forEach((video) => {
      const count = watchCounts.get(video.id) || 0;
      if (count < minWatchCount) minWatchCount = count;
    });

    const leastWatchedVideos = ALL_VIDEOS.filter(
      (video) => (watchCounts.get(video.id) || 0) === minWatchCount
    );
    const nextVideo =
      leastWatchedVideos[Math.floor(Math.random() * leastWatchedVideos.length)];

    setPlaylist((prev) => [...prev, nextVideo.id]);
    setWatchCounts((prev) =>
      new Map(prev).set(nextVideo.id, (prev.get(nextVideo.id) || 0) + 1)
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
                key={`${id}-${position}`}
                className="video-slide"
                style={{
                  top: `${position * 100}%`,
                  backgroundColor: getColorById(id),
                }}
              >
                <span className="video-id">{id}</span>
              </div>
            ))}
          </div>
          <div className="info-overlay">
            <p>현재 영상: {playlist[currentIndex]}</p>
            <p>재생 목록: {playlist.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
