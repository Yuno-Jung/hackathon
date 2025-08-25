import React, { useEffect, useRef } from "react";

function YourVideoComponent({ id, position, currentIndex, isMuted }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (position === currentIndex) {
        videoRef.current.play().catch(error => {
          console.log("자동 재생 오류:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [position, currentIndex]);

  return (
    <video
      ref={videoRef}
      src={id.videourl}
      className="video"
      loop
      playsInline
      muted={isMuted}
    >
    </video>
  );
}

export default YourVideoComponent