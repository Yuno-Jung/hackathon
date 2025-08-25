import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import Header from "../components/Header";
import "./short.css";
import { livsistateContext } from "../App";
import YourVideoComponent from "../components/VideoComponent";

export default function Short() {
  const { Videos } = useContext(livsistateContext);

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchCounts, setWatchCounts] = useState(new Map());
  const [isMuted, setIsMuted] = useState(true);

  const containerRef = useRef(null);
  const startY = useRef(0);
  const endY = useRef(0);
  const isDragging = useRef(false);
  const pressTimer = useRef(null);
  const isLongPress = useRef(false);
  const videoRef = useRef(null)
  
  useEffect(() => {
    if (!Videos || Videos.length === 0 || playlist.length > 0) return;

    const getIdFromHash = () => window.location.hash.substring(1);
    const idFromHash = getIdFromHash();

    const initialVideo =
      Videos.find((v) => v.videoId === idFromHash) || Videos[0];

    if (initialVideo) {
      setPlaylist([
        {
          id: initialVideo.videoId,
          videourl: initialVideo.videoUrl,
          sido: initialVideo.sido,
          sigungu: initialVideo.sigungu,
        },
      ]);
      setWatchCounts(new Map([[initialVideo.videoId, 1]]));

      if (idFromHash !== initialVideo.videoId) {
        window.location.hash = initialVideo.videoId;
      }
    }
  }, [Videos, playlist.length]);

  useEffect(() => {
    const handleHashChange = () => {
      const videoId = window.location.hash.substring(1);
      if (!videoId) return;

      const indexInPlaylist = playlist.findIndex(
        (video) => video.id === videoId
      );

      if (indexInPlaylist !== -1) {
        setCurrentIndex(indexInPlaylist);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [playlist]);

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
    Videos.forEach((video) => {
      const count = watchCounts.get(video.videoUrl) || 0;
      if (count < minWatchCount) minWatchCount = count;
    });

    const leastWatchedVideos = Videos.filter(
      (video) => (watchCounts.get(video.videoUrl) || 0) === minWatchCount
    );
    const nextVideo =
      leastWatchedVideos[Math.floor(Math.random() * leastWatchedVideos.length)];

    setPlaylist((prev) => [
      ...prev,
      { id: nextVideo.videoId, videourl: nextVideo.videoUrl },
    ]);
    setWatchCounts((prev) =>
      new Map(prev).set(
        nextVideo.videoId,
        (prev.get(nextVideo.videoId) || 0) + 1
      )
    );
    setCurrentIndex((prev) => prev + 1);
  };
  const dragStart = (y) => {
    startY.current = y;
    endY.current = y;
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

    startY.current = 0;
    endY.current = 0;
  };
  const onMousemove = () => {
    console.log(window.MouseEvent);
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

  const PRESS_THRESHOLD = 250

  const handlePressStart = (e) => {
    e.preventDefault();
    const targetElement = e.currentTarget;
    isLongPress.current = false;

    pressTimer.current = setTimeout(() => {
      const videoEl = targetElement.querySelector("video");
      if (videoEl) {
        videoEl.pause();
      }
      isLongPress.current = true;
    }, PRESS_THRESHOLD);
  };

  const handlePressEnd = (e) => {
    clearTimeout(pressTimer.current);
    const targetElement = e.currentTarget;

    const videoEl = targetElement.querySelector("video");

    if (isLongPress.current) {
      if (videoEl && videoEl.paused) {
        videoEl.play();
      }
    } else {
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="player-container" onMouseMove={onMousemove}>
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
                onMouseDown={handlePressStart}
                onTouchStart={handlePressStart}
                onMouseUp={handlePressEnd}
                onTouchEnd={handlePressEnd}
              >
                {<YourVideoComponent id={id} position={position} currentIndex={currentIndex} isMuted={isMuted} />}

                <div className="info-overlay">
                  <span className="sido">{id.sido}</span>
                  <span className="sigungu">{id.sigungu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

